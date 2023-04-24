import React, { useContext, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import {
  CurrentVideoContext,
  RoomContext,
  UserNameContext,
  VideoQueueContext
} from '../Room/Room'
import VideoPlayerControls from './VideoPlayerControls'
import ReactPlayer from 'react-player'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import {
  CREATE_INTERACTIONS,
  DELETE_VIDEO_LIST_ITEM
} from '@/graphql/mutations'
import { SUBSCRIBE_TO_LATEST_INTERACTION } from '@/graphql/subscriptions'
import { GET_LATEST_INTERACTION } from '@/graphql/queries'
import VideoHintTile from './VideoHintTile'
import VideoPlayTile from './VideoPlayTile'
// This fixed SSR hydration issue cause by react-player
const ReactVideoPlayer = dynamic(() => import('./ReactPlayerWrapper'), {
  ssr: false
})

type InteractionData = {
  subscribetoLatesInteraction: {
    user: string
    input: string
    currentVideoTime: number
    videoId: string
  }
}

export default function VideoPlayer() {
  const { currentVideoId, setCurrentVideoId } = useContext(CurrentVideoContext)
  const [isPlayerInitialized, setIsPlayerInitialized] = useState<boolean>(false)
  const { videos, setVideos } = useContext(VideoQueueContext)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [playedSeconds, setPlayedSeconds] = useState<number>(0)
  const [onSeeking, setOnSeeking] = useState<boolean>(false)
  const player = useRef<ReactPlayer>(null)
  const { username } = useContext(UserNameContext)
  const { roomId } = useContext(RoomContext)
  const { data: latestInteraction, loading } = useQuery(
    GET_LATEST_INTERACTION,
    {
      variables: { room: roomId, limit: 1, sortDirection: 'DESC' }
    }
  )
  const [deleteVideoItem] = useMutation(DELETE_VIDEO_LIST_ITEM)
  const [setUserInteracted] = useMutation(CREATE_INTERACTIONS)
  useSubscription<InteractionData>(SUBSCRIBE_TO_LATEST_INTERACTION, {
    variables: { room: roomId },
    onData: ({ data }) => {
      const { user, input, currentVideoTime, videoId } =
        data.data.subscribetoLatesInteraction
      if (user !== username) {
        if (input === 'PLAY') {
          if (currentVideoId !== videoId) {
            setCurrentVideoId(videoId)
          }
          setIsPlaying(true)
        } else if (input === 'PAUSE') {
          setIsPlaying(false)
        } else if (input === 'SEEKTO') {
          //could improve by checking interaction time and current time
          player.current.seekTo(currentVideoTime, 'seconds')
        } else if (input === 'NEXT') {
          setCurrentVideoId(videoId)
        }
      }
    }
  })

  useEffect(() => {
    const data = latestInteraction?.latestInteraction?.items[0]
    if (data && currentVideoId == '') {
      setCurrentVideoId(data.videoId)
    }
    if (data && isPlayerInitialized && player.current) {
      setIsPlaying(data.isPlaying)
      const createat = new Date(data.createdAt)
      const currentTime = new Date()
      const differenceInSeconds =
        (currentTime.getTime() - createat.getTime()) / 1000
      const totalSeekTime = data.currentVideoTime + differenceInSeconds
      player.current.seekTo(totalSeekTime, 'seconds')
    }
  }, [latestInteraction, isPlayerInitialized])

  const seekTo = (value: number) => {
    if (!player?.current) return
    setPlayedSeconds(value)
  }

  const handleSeekMouseUp = (value: number) => {
    setOnSeeking(false)
    seekTo(value)
    setUserInteracted({
      variables: {
        input: {
          isPlaying: isPlaying,
          currentVideoTime: playedSeconds,
          input: 'SEEKTO',
          videoId: currentVideoId,
          user: username,
          room: roomId
        }
      }
    })
    player.current.seekTo(value, 'seconds')
  }

  const handleSeekMouseDown = () => {
    setOnSeeking(true)
  }

  const handlePlaybackChange = () => {
    setUserInteracted({
      variables: {
        input: {
          isPlaying: !isPlaying,
          currentVideoTime: playedSeconds,
          input: !isPlaying ? 'PLAY' : 'PAUSE',
          videoId: currentVideoId,
          user: username,
          room: roomId
        }
      }
    })
    setIsPlaying(!isPlaying)
  }

  // WHEN NEXT VIDEO IS PLAYED
  useEffect(() => {
    if (currentVideoId == 'NEXT_VIDEO' && videos.length) {
      setUserInteracted({
        variables: {
          input: {
            isPlaying: isPlaying,
            currentVideoTime: 0,
            input: 'NEXT',
            videoId: videos[0].src,
            user: username,
            room: roomId
          }
        }
      })
      deleteVideoItem({ variables: { input: { id: videos[0].id } } })
      setCurrentVideoId(videos[0].src)
      setVideos(videos.slice(1))
    }
  }, [currentVideoId, videos])

  return (
    <section className="relative w-full flex flex-col">
      <div
        id="video"
        className="relative h-5625 max-h-[calc(100vh-3rem)] overflow-hidden"
      >
        <div className="absolute h-full w-full z-10">
          {currentVideoId == '' && <VideoHintTile />}

          <VideoPlayTile isPlaying={isPlaying} onClick={handlePlaybackChange} />
        </div>
        <ReactVideoPlayer
          playerRef={player}
          playerProps={{
            width: '100%',
            height: '100%',
            muted: volume === 0,
            onEnded: () => {
              setCurrentVideoId('NEXT_VIDEO')
            },
            onReady: () => {
              setIsPlayerInitialized(true)
            },
            controls: false,
            playing: isPlaying,
            volume: volume,
            url: currentVideoId,
            style: {
              position: 'relative',
              objectFit: 'contain'
            },
            onSeek: () => {
              setOnSeeking(false)
            },
            onProgress: (data) => {
              if (!onSeeking) {
                setPlayedSeconds(data.playedSeconds)
              }
            },
            onDuration: (data) => setDuration(data)
          }}
        />
      </div>
      <VideoPlayerControls
        isPlaying={isPlaying}
        onPlaybackChange={handlePlaybackChange}
        volume={volume}
        onVolumeChange={(value: number) => setVolume(value)}
        onSeekChange={seekTo}
        onSeekMouseUp={handleSeekMouseUp}
        onSeekMouseDown={handleSeekMouseDown}
        onSeek={onSeeking}
        played={0}
        hasNext={videos.length > 0}
        onNext={() => {
          setCurrentVideoId('NEXT_VIDEO')
        }}
        duration={duration}
        elapsedTime={playedSeconds}
        onToggleFullScreen={() => {
          document.querySelector('#video').requestFullscreen()
        }}
        expandSeeker={false}
        numberOfUsers={0}
      />
    </section>
  )
}
