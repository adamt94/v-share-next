import { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { RoomContext, UserNameContext } from '@/components/Room/Room'
import {
  MESSAGES_BY_SEND_DATE,
  MessagesBySentDateQueryResult,
  MessagesBySentDateQueryVariables
} from '@/graphql/queries'
import { CREATE_MESSAGE } from '@/graphql/mutations'
import { ON_CREATE_MESSAGE } from '@/graphql/subscriptions'

export default function ChatTab() {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const [sendMessage] = useMutation(CREATE_MESSAGE)
  useSubscription(ON_CREATE_MESSAGE, {
    onSubscriptionData: ({ client }) => {
      client.refetchQueries({ include: ['MessagesBySentDate'] })
    }
  })
  const { roomId } = useContext(RoomContext)
  const { username } = useContext(UserNameContext)

  const {
    loading,
    error,
    data: { messagesBySentDate } = {}
  } = useQuery<MessagesBySentDateQueryResult, MessagesBySentDateQueryVariables>(
    MESSAGES_BY_SEND_DATE,
    {
      variables: {
        roomId: roomId,
        sortDirection: 'ASC'
      }
    }
  )

  // useEffect(() => {
  //   if (messageSendData && messageSendData.onCreateMessage) {
  //     setMessageList([...messageList, messageSendData.onCreateMessage]);
  //   }
  // }, [messageSendData, messageList]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message.trim() !== '') {
      setMessageList([...messageList, message])
      setMessage('')
      sendMessage({
        variables: {
          input: { text: message, user: username, roomId: roomId }
        }
      })
    }
  }
  return (
    <>
      <div className="flex-grow overflow-auto flex flex-col-reverse">
        <div className="flex flex-col">
          <Message message="You want some ill give it to ya" sender />
          <Message message="Na your fat m9" username="Scrub Lord" />
          {!loading &&
            messagesBySentDate.items.map((message, i) => (
              <Message
                key={message.text + i}
                message={message.text}
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
