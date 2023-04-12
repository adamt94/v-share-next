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
import { useMutation, useSubscription } from '@apollo/client'
import { CREATE_INTERACTIONS } from '@/graphql/mutations'
import { SUBSCRIBE_TO_LATEST_INTERACTION } from '@/graphql/subscriptions'
// This fixed SSR hydration issue cause by react-player
const ReactVideoPlayer = dynamic(() => import('./ReactPlayerWrapper'), {
  ssr: false
})

export default function VideoPlayer() {
  const { currentVideoId, setCurrentVideoId } = useContext(CurrentVideoContext)
  const { videos, setVideos } = useContext(VideoQueueContext)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.1)
  const [duration, setDuration] = useState<number>(0)
  const [playedSeconds, setPlayedSeconds] = useState<number>(0)
  const [onSeeking, setOnSeeking] = useState<boolean>(false)
  const player = useRef<ReactPlayer>(null)
  const { username } = useContext(UserNameContext)
  const { roomId } = useContext(RoomContext)
  const [setUserInteracted] = useMutation(CREATE_INTERACTIONS)
  useSubscription(SUBSCRIBE_TO_LATEST_INTERACTION, {
    variables: { room: roomId },
    onSubscriptionData: ({ subscriptionData }) => {
      const { user, input, currentVideoTime } =
        subscriptionData.data.subscribetoLatesInteraction
      if (user !== username) {
        if (input === 'PLAY') {
          setIsPlaying(true)
        } else if (input === 'PAUSE') {
          setIsPlaying(false)
        } else if (input === 'SEEKTO') {
          //could improve by checking interaction time and current time
          player.current.seekTo(currentVideoTime, 'seconds')
        }
      }
    }
  })

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
          isPlaying: !isPlaying,
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

  useEffect(() => {
    if (!currentVideoId && videos.length) {
      setCurrentVideoId(videos[0].src)
      setVideos(videos.slice(1))
    }
  }, [currentVideoId, videos])

  return (
    <section className="relative w-full flex flex-col">
      <div className="h-[calc(100vh-3rem)] overflow-hidden">
        <ReactVideoPlayer
          playerRef={player}
          playerProps={{
            width: '100%',
            height: '100%',
            onEnded: () => {
              setCurrentVideoId('')
            },
            onReady: () => {
              setIsPlaying(true)
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
              console.log('onSeek')
              setOnSeeking(false)
            },
            onProgress: (data) => {
              if (!onSeeking) {
                setPlayedSeconds(data.playedSeconds)
              }
            },
            config: {
              youtube: {
                playerVars: { controls: 0 }
              }
            },
            onDuration: (data) => setDuration(data)
          }}
        />
      </div>
      <VideoPlayerControls
        isPlaying={isPlaying}
        onPlaybackChange={() => {
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
          console.log('onPlaybackChange')
          setIsPlaying(!isPlaying)
        }}
        volume={volume}
        onVolumeChange={(value: number) => setVolume(value)}
        onSeekChange={seekTo}
        onSeekMouseUp={handleSeekMouseUp}
        onSeekMouseDown={handleSeekMouseDown}
        onSeek={onSeeking}
        played={0}
        hasNext={videos.length > 0}
        onNext={() => {
          setCurrentVideoId('')
        }}
        duration={duration}
        elapsedTime={playedSeconds}
        onToggleFullScreen={function (): void {
          throw new Error('Function not implemented.')
        }}
        expandSeeker={false}
        numberOfUsers={0}
      />
    </section>
  )
}
