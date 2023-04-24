import { useState } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import CheckIcon from '@mui/icons-material/Check'
import Tooltip from './ToolTip'

type RoomIdProps = {
  roomId: string
}
export default function RoomId({ roomId }: RoomIdProps) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  return (
    <div className="inline-flex items-center justify-center surface-1">
      <input
        className={`h-10 rounded-md rounded-r-none w-80 px-3 text-sm bg-transparent  on-surface-text ${
          roomId ? 'border-blue-500' : 'border-gray-300'
        } focus:border-blue-500 focus:outline-none`}
        type="text"
        value={roomId}
        readOnly
        onClick={handleInputClick}
      />
      <Tooltip text={'Copied!'} defaultShowTooltip disabled={!copied}>
        <button
          onClick={handleCopy}
          className="px-3 py-2 on-primary-container-text primary-container rounded-md rounded-l-none"
        >
          {copied ? (
            <CheckIcon className="on-primary-container-text" />
          ) : (
            <ShareIcon className="on-primary-container-text" />
          )}
        </button>
      </Tooltip>
    </div>
  )
}
