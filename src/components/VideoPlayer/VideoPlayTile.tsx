import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

type VideoPlayTileProps = {
  isPlaying?: boolean
  onClick?: () => void
}

export default function VideoPlayTile({
  isPlaying,
  onClick
}: VideoPlayTileProps) {
  return (
    <button
      className={`flex flex-col justify-center items-center h-full w-full on-surface-text z-10  ${
        !isPlaying && 'surface-5'
      }`}
      onClick={onClick}
    >
      {!isPlaying && (
        <PlayArrowIcon style={{ fontSize: 100 }} className="primary-text" />
      )}
    </button>
  )
}
