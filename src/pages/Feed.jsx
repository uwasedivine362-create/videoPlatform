import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";
import Loader from "../components/Loader";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feed", selectedCategory],
    queryFn: () =>
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}&maxResults=20&type=video,channel`),
  });

  return (
    <div className="feed-layout">
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="feed-content">
        <h2 className="feed-title">{selectedCategory} <span>Videos</span></h2>

        {isLoading && <Loader />}

        {isError && (
          <div className="error-box">
             Failed to load videos. API limit may be reached. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="video-grid">
            {data?.items?.map((item, idx) =>
              item?.id?.videoId ? (
                <VideoCard key={idx} video={item} />
              ) : item?.id?.channelId ? (
                <ChannelCard key={idx} channel={item} />
              ) : null
            )}
          </div>
        )}

        {!isLoading && !isError && !data?.items?.length && (
          <p className="no-results">No videos found for "{selectedCategory}".</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
