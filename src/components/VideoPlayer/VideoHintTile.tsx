type VideoHintTileProps = {
  heading: string
  subheading: string
}

// HACK: This is a workaround for the issue with SSR hydration the playerRef doesn't work with dynamic import

export default function VideoHintTile() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full on-surface-text opacity-70">
      <p>Click a video tile to start playing</p> <p>or</p>
      <p>press the + to add it to the queue</p>
    </div>
  )
}
