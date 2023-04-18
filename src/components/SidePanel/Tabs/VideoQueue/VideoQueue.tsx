import { useCallback, useContext, useEffect, useState } from 'react'
// weird issue with dnd React Strict mode has to be disabled, issue not been fixed due to no more support
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import VideoCard from './VideoCard'
import {
  CurrentVideoContext,
  RoomContext,
  UserNameContext,
  VideoQueueContext
} from '@/components/Room/Room'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { GET_VIDEO_LIST_BY_RANK } from '@/graphql/queries'
import { SUBSCRIBE_TO_VIDEO_LIST } from '@/graphql/subscriptions'
import {
  CREATE_INTERACTIONS,
  DELETE_VIDEO_LIST_ITEM,
  UPDATE_VIDEO_LIST
} from '@/graphql/mutations'

export default function VideoQueue() {
  const { videos, setVideos } = useContext(VideoQueueContext)
  const { setCurrentVideoId } = useContext(CurrentVideoContext)
  const { roomId } = useContext(RoomContext)
  const { username } = useContext(UserNameContext)
  const [setUserInteracted] = useMutation(CREATE_INTERACTIONS)
  const { data } = useQuery(GET_VIDEO_LIST_BY_RANK, {
    fetchPolicy: 'no-cache',
    variables: { room: roomId }
  })
  const [updateVideoList] = useMutation(UPDATE_VIDEO_LIST)
  const [deleteVideoItem] = useMutation(DELETE_VIDEO_LIST_ITEM)
  useSubscription(SUBSCRIBE_TO_VIDEO_LIST, {
    variables: { room: roomId },
    onData: ({ client, data }) => {
      client.refetchQueries({ include: ['VideoListByRank'] })
    }
  })

  const onDragEnd = useCallback((result: DropResult) => {
    setVideos((prevVideos) => {
      const newVideos = [...prevVideos]
      const [removed] = newVideos.splice(result.source.index, 1)
      if (result.destination != null) {
        newVideos.splice(result.destination.index, 0, removed)
        newVideos.forEach((video, index) => {
          if (prevVideos[index].rank !== index) {
            updateVideoList({
              variables: {
                input: {
                  id: video.id,
                  rank: index
                }
              }
            })
          }
        })
      }

      return newVideos
    })
  }, [])

  useEffect(() => {
    const videoListByRank = data?.videoListByRank?.items
    if (videoListByRank) {
      setVideos(
        videoListByRank.map((video) => ({
          id: video.id,
          title: video.title,
          thumbnail: video.imgurl,
          src: video.src,
          rank: video.rank
        }))
      )
    }
  }, [data])

  if (videos.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-full on-surface-text opacity-70">
        Press the
        <AddCircleIcon className="mr-2" />
        to queue a video
      </div>
    )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="video-list">
          {(provided) => (
            <div
              className=" flex flex-col gap-5 p-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {videos.map((video, index) => (
                <VideoCard
                  key={video.src + index}
                  id={video.src + index}
                  heading={video.title}
                  subheading={video.user}
                  image={video.thumbnail}
                  onCardClick={() => {
                    setUserInteracted({
                      variables: {
                        input: {
                          isPlaying: true,
                          currentVideoTime: 0,
                          input: 'PLAY',
                          videoId: video.src,
                          user: username,
                          room: roomId
                        }
                      }
                    })
                    setCurrentVideoId(video.src)
                  }}
                  onDelete={() => {
                    deleteVideoItem({
                      variables: {
                        input: {
                          id: video.id
                        }
                      }
                    })
                    setVideos(videos.filter((_, i) => i !== index))
                  }}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}
