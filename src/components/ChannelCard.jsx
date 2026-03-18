import { Link } from "react-router-dom";

function ChannelCard({ channel }) {
  const channelId = channel?.id?.channelId || channel?.snippet?.channelId;
  const title = channel?.snippet?.title;
  const thumbnail = channel?.snippet?.thumbnails?.medium?.url;

  if (!channelId) return null;

  return (
    <div className="channel-card">
      <Link to={`/channel/${channelId}`}>
        <img src={thumbnail} alt={title} className="channel-avatar" />
        <p className="channel-name">{title}</p>
      </Link>
    </div>
  );
}

export default ChannelCard;
