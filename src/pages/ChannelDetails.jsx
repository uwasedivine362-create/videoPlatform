import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

function ChannelDetails() {
  const { id } = useParams();

  const { data: channelData, isLoading: loadingChannel, isError: errorChannel } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => fetchFromAPI(`channels?part=snippet,statistics&id=${id}`),
  });

  const { data: videosData, isLoading: loadingVideos, isError: errorVideos } = useQuery({
    queryKey: ["channelVideos", id],
    queryFn: () => fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&maxResults=20`),
  });

  const channel = channelData?.items?.[0];

  return (
    <div className="channel-details">
      {loadingChannel && <Loader />}

      {errorChannel && (
        <div className="error-box"> Could not load channel info. Please try again later.</div>
      )}

      {!loadingChannel && !errorChannel && channel && (
        <div className="channel-header">
          <img
            src={channel.snippet?.thumbnails?.high?.url}
            alt={channel.snippet?.title}
            className="channel-banner-avatar"
          />
          <div className="channel-meta">
            <h2>{channel.snippet?.title}</h2>
            <p>{Number(channel.statistics?.subscriberCount || 0).toLocaleString()} subscribers</p>
            <p className="channel-desc">{channel.snippet?.description?.slice(0, 200)}...</p>
          </div>
        </div>
      )}

      <h3 className="section-title">Uploaded Videos</h3>

      {loadingVideos && <Loader />}

      {errorVideos && (
        <div className="error-box"> Could not load videos. Please try again later.</div>
      )}

      <div className="video-grid">
        {videosData?.items?.map((item, idx) => (
          <VideoCard key={idx} video={item} />
        ))}
      </div>
    </div>
  );
}

export default ChannelDetails;
