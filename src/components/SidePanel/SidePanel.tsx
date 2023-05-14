import React, { useContext, useEffect, useState } from 'react'
import { TabPanel } from './TabPanel'
import ChatTab from './Tabs/Chat/Chat'
import VideoQueue from './Tabs/VideoQueue/VideoQueue'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import {
  MessagesSubscriptionResult,
  SUBSCRIBE_TO_MESSAGES
} from '@/graphql/subscriptions'
import {
  MESSAGES_BY_SEND_DATE,
  MessageQuery,
  MessagesBySentDateQueryResult,
  MessagesBySentDateQueryVariables
} from '@/graphql/queries'
import { RoomContext, UserNameContext } from '../Room/Room'
import { CREATE_MESSAGE } from '@/graphql/mutations'

type SidePanelProps = {
  onToggle: (isOpen: boolean) => void
  isOpen?: boolean
  style?: React.CSSProperties
  togglePanel?: () => void
}

const SidePanel = ({ onToggle, isOpen }: SidePanelProps) => {
  const [messageList, setMessageList] = useState<MessageQuery[]>([])
  const [sendMessage] = useMutation(CREATE_MESSAGE)

  const { roomId } = useContext(RoomContext)
  const { username } = useContext(UserNameContext)

  const { data: { messagesBySentDate } = {} } = useQuery<
    MessagesBySentDateQueryResult,
    MessagesBySentDateQueryVariables
  >(MESSAGES_BY_SEND_DATE, {
    variables: {
      roomId: roomId,
      sortDirection: 'ASC'
    }
  })
  useSubscription<MessagesSubscriptionResult>(SUBSCRIBE_TO_MESSAGES, {
    variables: { roomId: roomId },
    onData: ({ client, data }) => {
      if (username !== data.data.subscribeToMessages.user) {
        setMessageList([...messageList, data.data.subscribeToMessages])
      }
    }
  })

  useEffect(() => {
    if (messagesBySentDate) {
      setMessageList(messagesBySentDate.items)
    }
  }, [messagesBySentDate])

  const togglePanel = () => {
    onToggle(!isOpen)
  }

  const sendMessageHandler = (message: string) => {
    setMessageList([...messageList, { text: message, user: username }])
    sendMessage({
      variables: {
        input: { text: message, user: username, roomId: roomId }
      }
    })
  }

  return (
    <div className="flex flex-col h-full sm:h-screen">
      <TabPanel
        tabs={[
          {
            title: 'Messages',
            content: (
              <ChatTab
                messages={messageList}
                sendMessage={sendMessageHandler}
                username={username}
              />
            )
          },
          {
            title: 'Video Queue',
            content: <VideoQueue />
          }
        ]}
      />
      <button
        onClick={togglePanel}
        className="absolute right-0  bottom-0 sm:top-0 sm:bottom-auto m-2 on-surface surface-text rounded-full focus:outline-none"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default SidePanel
