type MessageProps = {
  sender?: boolean
  message: string
  username?: string
  sentTime?: string
}
export default function Message({
  sender,
  message,
  username,
  sentTime
}: MessageProps) {
  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) {
      return '1 min ago'
    }
    const now = new Date()
    const sentTime = new Date(timestamp)
    const diffInSeconds = Math.round(
      (now.getTime() - sentTime.getTime()) / 1000
    )

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      return `${diffInMinutes} ${diffInMinutes > 1 ? 'mins' : 'min'} ago`
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return `${diffInHours} ${diffInHours > 1 ? 'hours' : 'hour'} ago`
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400)
      return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`
    }
  }

  return (
    <div className="p-4">
      {sender ? (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <span className="text-sm on-surface-variant-text opacity-60">
              You
            </span>
            <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">{message}</p>
            </div>
            <span className="text-xs outline-text leading-none">
              {getTimeAgo(sentTime)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <span className="text-sm on-surface-variant-text">{username}</span>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">{message}</p>
            </div>
            <span className="text-xs outline-text leading-none">
              {getTimeAgo(sentTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
