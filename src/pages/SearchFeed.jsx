import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";
import Loader from "../components/Loader";

function SearchFeed() {
  const { searchTerm } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=20`),
  });

  return (
    <div className="search-feed">
      <h2 className="feed-title">Results for: <span>{searchTerm}</span></h2>

      {isLoading && <Loader />}

      {isError && (
        <div className="error-box"> Search failed. API limit may be reached. Try again later.</div>
      )}

      {!isLoading && !isError && (
        <div className="video-grid">
          {data?.items?.map((item, idx) =>
            item.id.videoId ? (
              <VideoCard key={idx} video={item} />
            ) : (
              <ChannelCard key={idx} channel={item} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchFeed;
