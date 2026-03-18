import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

function VideoDetails() {
  const { id } = useParams();

  const { data: videoData, isLoading: loadingVideo, isError: errorVideo } = useQuery({
    queryKey: ["video", id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
  });

  const video = videoData?.items?.[0];
  const videoTitle = video?.snippet?.title || "";

  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ["related", id, videoTitle],
    queryFn: () =>
      fetchFromAPI(`search?part=snippet&q=${encodeURIComponent(videoTitle)}&maxResults=15&type=video`),
    enabled: !!videoTitle,
  });

  return (
    <div className="video-details-layout">

      {/* LEFT: Player + Info */}
      <div className="video-player-section">

        {loadingVideo && <Loader />}

        {errorVideo && (
          <div className="error-box">
             Could not load video. API limit may be reached or video is unavailable.
          </div>
        )}

        {!loadingVideo && !errorVideo && (
          <>
            {/* YouTube iframe - most reliable way to play videos */}
            <div className="player-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                title={video?.snippet?.title || "Video Player"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ borderRadius: "10px", border: "none" }}
              />
            </div>

            <h3 className="video-detail-title">{video?.snippet?.title}</h3>

            <Link to={`/channel/${video?.snippet?.channelId}`} className="video-channel-name">
              {video?.snippet?.channelTitle}
            </Link>

            <div className="video-stats">
              <span>👁 {Number(video?.statistics?.viewCount || 0).toLocaleString()} views</span>
              <span>👍 {Number(video?.statistics?.likeCount || 0).toLocaleString()} likes</span>
              <span>💬 {Number(video?.statistics?.commentCount || 0).toLocaleString()} comments</span>
            </div>

            {video?.snippet?.description && (
              <div className="video-description">
                {video.snippet.description.slice(0, 400)}
                {video.snippet.description.length > 400 ? "..." : ""}
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT: Related Videos */}
      <div className="related-videos">
        <h4>Related Videos</h4>
        {loadingRelated && <Loader />}
        {!loadingRelated && relatedData?.items?.map((item, idx) => (
          <VideoCard key={idx} video={item} />
        ))}
        {!loadingRelated && !relatedData?.items?.length && (
          <p className="no-results">No related videos found.</p>
        )}
      </div>

    </div>
  );
}

export default VideoDetails;
