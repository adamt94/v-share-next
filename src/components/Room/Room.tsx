import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import Search, { Video } from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useRandomName } from '@/util/useRandomName'

type VideoContextType = {
  currentVideoId: string
  setCurrentVideoId: Dispatch<SetStateAction<string>>
}

type RoomContextType = {
  roomId: string
}

type QueueContextType = {
  videos: Video[]
  setVideos: Dispatch<SetStateAction<Video[]>>
}

type UsernameContextType = {
  username: string
}

export const UserNameContext = createContext<UsernameContextType>({
  username: ''
})

export const CurrentVideoContext = createContext<VideoContextType>({
  currentVideoId: '',
  setCurrentVideoId: () => {}
})

export const VideoQueueContext = createContext<QueueContextType>({
  videos: [],
  setVideos: () => {}
})

export const RoomContext = createContext<RoomContextType>({
  roomId: ''
})

export default function Room({ roomId }) {
  const [showSecondColumn, setShowSecondColumn] = useState<boolean>(true)
  const [currentVideoId, setCurrentVideoId] = useState<string>('')
  const [videos, setVideos] = useState<Video[]>([])

  const firstColumnClass = showSecondColumn ? 'w-full' : 'w-full'
  const secondColumnClass = showSecondColumn ? '' : 'hidden'
  const firstColumnMobile = showSecondColumn ? 'h-2/5' : 'h-full'
  const secondColumnMobile = showSecondColumn ? 'h-3/5' : ''
  const username = useRandomName()
  if (!roomId) return <div>Room not found</div>

  return (
    <UserNameContext.Provider value={{ username }}>
      <CurrentVideoContext.Provider
        value={{ currentVideoId, setCurrentVideoId }}
      >
        <VideoQueueContext.Provider value={{ videos, setVideos }}>
          <RoomContext.Provider value={{ roomId }}>
            <div className="flex h-screen flex-col sm:flex-row">
              <section
                className={`text-center flex flex-col gap-8 overflow-auto w-full ${firstColumnMobile} sm:h-full`}
                id="left-column"
              >
                <VideoPlayer />

                <section className="p-0  py-5 max-overscroll-y  sm:p-5 ">
                  <Search />
                </section>
              </section>
              <button
                onClick={() => {
                  setShowSecondColumn(true)
                }}
                className={`absolute right-0 bottom-0 m-4 sm:top-0 sm:bottom-auto primary-container on-primary-container-text rounded-full p-2 focus:outline-none ${
                  showSecondColumn && 'hidden'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <aside
                className={`${secondColumnClass} overflow-hidden hide-scroll ${secondColumnMobile} sm:h-full`}
                id="right-column"
              >
                <SidePanel
                  isOpen={showSecondColumn}
                  onToggle={(value) => {
                    setShowSecondColumn(value)
                  }}
                />
              </aside>
            </div>
          </RoomContext.Provider>
        </VideoQueueContext.Provider>
      </CurrentVideoContext.Provider>
    </UserNameContext.Provider>
  )
}
