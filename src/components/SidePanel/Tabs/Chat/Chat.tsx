import { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { RoomContext, UserNameContext } from '@/components/Room/Room'
import {
  MESSAGES_BY_SEND_DATE,
  MessageQuery,
  MessagesBySentDateQueryResult,
  MessagesBySentDateQueryVariables
} from '@/graphql/queries'
import { CREATE_MESSAGE } from '@/graphql/mutations'
import {
  MessagesSubscriptionResult,
  SUBSCRIBE_TO_MESSAGES
} from '@/graphql/subscriptions'


type ChatTabProps = {
  messages: MessageQuery[]
  sendMessage: (message: string) => void
  username: string
}

export default function ChatTab({
  messages,
  sendMessage,
  username
}: ChatTabProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message.trim() !== '') {
      sendMessage(message)
      setMessage('')
      // sendMessage({
      //   variables: {
      //     input: { text: message, user: username, roomId: roomId }
      //   }
      // })
    }
  }

  return (
    <>
      <div className="flex-grow overflow-auto flex flex-col-reverse">
        <div className="flex flex-col">
          {messages.map((message, i) => (
            <Message
              key={message.text + i}
              message={message.text}
              username={message.user}
              sentTime={message.createdAt}
              sender={username === message.user ? true : false}
            />
          ))}
        </div>
      </div>
      <div className="surface-1 p-4 pt-0 flex-shrink">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <button
              onClick={() => {
                handleSubmit
              }}
            >
              <SendIcon className=" absolute bottom-2 right-2 on-primary-container-text" />
            </button>
            <input
              className="flex items-center h-10 w-full rounded px-3 text-sm surface on-surface-text"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message…"
            />
          </div>
        </form>
      </div>
    </>
  )
}
