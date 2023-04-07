import { FormEvent, useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import SearchCard from "./SearchCard";
import SearchForm from "./SearchForm";
import useSearch from "./useSearch";
import LoadingCards from "./LoadingCards";
import { CurrentVideoContext } from "../Room/Room";

const GET_POPULAR_VIDEO_QUERY = gql`
  query popularVideos {
    getMostPopularVideos {
      title
      thumbnail
      src
      user
    }
  }
`;
export type Video = {
  title: string;
  thumbnail: string;
  src: string;
  user: string;
};

type Data = {
  getMostPopularVideos: Video[];
};

export default function Search() {
  const {
    data: { getMostPopularVideos } = {},
    loading,
    error,
  } = useQuery<Data>(GET_POPULAR_VIDEO_QUERY, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });
  const [searchValue, setSearchValue] = useState("");
  const { setCurrentVideoId } = useContext(CurrentVideoContext);
  const {
    videos,
    loading: searchLoading,
    error: searchError,
  } = useSearch({
    value: searchValue,
    type: "youtube",
  });

  if (loading || searchLoading)
    return (
      <>
        <SearchForm
          onSubmit={(value) => {
            setSearchValue(value);
          }}
        />
        <div className="flex flex-wrap justify-center py-10">
          <LoadingCards numberOfCards={6} />
        </div>
      </>
    );
  return (
    <>
      <SearchForm
        onSubmit={(value) => {
          setSearchValue(value);
        }}
      />

      <div className="flex flex-wrap justify-center py-10">
        {(videos || getMostPopularVideos)?.map(
          (
            video: Video // use the 'Video' type here
          ) => (
            <SearchCard
              key={video.src}
              heading={video.title}
              subheading={video.user}
              image={video.thumbnail}
              onCardClick={() => {
                setCurrentVideoId(video.src);
              }}
            />
          )
        )}
      </div>
    </>
  );
}
