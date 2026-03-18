import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const videoId = video?.id?.videoId || (typeof video?.id === "string" ? video.id : null);
  const channelId = video?.snippet?.channelId;
  const thumbnail =
    video?.snippet?.thumbnails?.medium?.url ||
    video?.snippet?.thumbnails?.high?.url ||
    video?.snippet?.thumbnails?.default?.url;
  const title = video?.snippet?.title;
  const channelTitle = video?.snippet?.channelTitle;

  if (!videoId || !thumbnail) return null;

  return (
    <div className="video-card">
      <Link to={`/video/${videoId}`}>
        <img src={thumbnail} alt={title} className="video-thumb" />
      </Link>
      <div className="video-info">
        <Link to={`/video/${videoId}`} className="video-title">{title}</Link>
        <Link to={`/channel/${channelId}`} className="video-channel">{channelTitle}</Link>
      </div>
    </div>
  );
}

export default VideoCard;
