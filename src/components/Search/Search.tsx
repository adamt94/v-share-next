import { FormEvent, useContext, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import SearchCard from './SearchCard'
import SearchForm from './SearchForm'
import useSearch from './useSearch'
import LoadingCards from './LoadingCards'
import {
  CurrentVideoContext,
  RoomContext,
  UserNameContext,
  VideoQueueContext
} from '../Room/Room'
import { GET_POPULAR_VIDEO_QUERY } from '@/graphql/queries'
import {
  CREATE_INTERACTIONS,
  CREATE_VIDEO_LIST_ITEM
} from '@/graphql/mutations'

export type Video = {
  id: string
  title: string
  thumbnail: string
  src: string
  user: string
  rank: number
}

type Data = {
  getMostPopularVideos: Video[]
}

export default function Search() {
  const {
    data: { getMostPopularVideos } = {},
    loading,
    error
  } = useQuery<Data>(GET_POPULAR_VIDEO_QUERY, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })
  const [searchValue, setSearchValue] = useState('')
  const { setCurrentVideoId } = useContext(CurrentVideoContext)
  const { videos, setVideos } = useContext(VideoQueueContext)
  const { roomId } = useContext(RoomContext)
  const { username } = useContext(UserNameContext)

  const [addVideoToQueue] = useMutation(CREATE_VIDEO_LIST_ITEM)
  const [setUserInteracted] = useMutation(CREATE_INTERACTIONS)

  const {
    videos: searchVideos,
    loading: searchLoading,
    error: searchError
  } = useSearch({
    value: searchValue,
    type: 'youtube'
  })

  if (loading || searchLoading)
    return (
      <div className="mt-6">
        <SearchForm
          onSubmit={(value) => {
            setSearchValue(value)
          }}
        />
        <div className="flex flex-wrap justify-center py-10">
          <LoadingCards numberOfCards={6} />
        </div>
      </div>
    )
  return (
    <div className="mt-6">
      <SearchForm
        onSubmit={(value) => {
          setSearchValue(value)
        }}
      />

      <div className="flex flex-wrap justify-center py-10">
        {(searchVideos || getMostPopularVideos)?.map(
          (
            video: Video,
            index: number // use the 'Video' type here
          ) => (
            <SearchCard
              key={video.src}
              heading={video.title}
              subheading={video.user}
              image={video.thumbnail}
              onAddToQueue={() => {
                setVideos([...videos, video]),
                  addVideoToQueue({
                    variables: {
                      input: {
                        room: roomId,
                        description: video.title,
                        channelTitle: video.user,
                        title: video.title,
                        src: video.src,
                        imgurl: video.thumbnail,
                        rank: videos.length,
                        user: username
                      }
                    }
                  })
              }}
              onCardClick={() => {
                setUserInteracted({
                  variables: {
                    input: {
                      isPlaying: true,
                      currentVideoTime: 0,
                      input: 'NEXT',
                      videoId: video.src,
                      user: username,
                      room: roomId
                    }
                  }
                })
                setCurrentVideoId(video.src)
              }}
            />
          )
        )}
      </div>
    </div>
  )
}
