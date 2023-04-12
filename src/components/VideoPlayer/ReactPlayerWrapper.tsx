import ReactPlayer from 'react-player/lazy'
import { BaseReactPlayerProps } from 'react-player/base'

type VideoPlayerProps = {
  playerRef: React.RefObject<ReactPlayer> | undefined
  playerProps: BaseReactPlayerProps
}

// HACK: This is a workaround for the issue with SSR hydration the playerRef doesn't work with dynamic import

export default function VideoPlayer({
  playerRef,
  playerProps
}: VideoPlayerProps) {
  return <ReactPlayer ref={playerRef} {...playerProps} />
}
