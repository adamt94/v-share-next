import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import {
  TypedDocumentNode,
  gql,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { RoomContext, UserNameContext } from "@/components/Room/Room";

export const MESSAGES_BY_SEND_DATE = gql`
  query MessagesBySentDate(
    $roomId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySentDate(
      roomId: $roomId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user
        text
      }
      nextToken
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      createdAt
      user
      text
      roomId
      updatedAt
    }
  }
`;

export const onCreateMessage = gql`
  subscription OnCreateMessage {
    onCreateMessage {
      id
      createdAt
      user
      text
      roomId
      updatedAt
    }
  }
`;

type Message = {
  user: string;
  text: string;
};

type MessagesBySentDateQueryResult = {
  messagesBySentDate: {
    items: Message[];
    nextToken?: string;
  };
};

type MessagesBySentDateQueryVariables = {
  roomId?: string;
  createdAt?: string;
  sortDirection?: "ASC" | "DESC";
  filter?: {
    user?: {
      eq?: string;
    };
  };
  limit?: number;
  nextToken?: string;
};

export default function ChatTab() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [sendMessage] = useMutation(CREATE_MESSAGE);
  useSubscription(onCreateMessage, {
    onSubscriptionData: ({ client }) => {
      client.refetchQueries({ include: ["MessagesBySentDate"] });
    },
  });
  const { roomId } = useContext(RoomContext);
  const { username } = useContext(UserNameContext);

  const {
    loading,
    error,
    data: { messagesBySentDate } = {},
  } = useQuery<MessagesBySentDateQueryResult, MessagesBySentDateQueryVariables>(
    MESSAGES_BY_SEND_DATE,
    {
      variables: {
        roomId: roomId,
        sortDirection: "ASC",
      },
    }
  );

  // useEffect(() => {
  //   if (messageSendData && messageSendData.onCreateMessage) {
  //     setMessageList([...messageList, messageSendData.onCreateMessage]);
  //   }
  // }, [messageSendData, messageList]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessageList([...messageList, message]);
      setMessage("");
      sendMessage({
        variables: {
          input: { text: message, user: username, roomId: roomId },
        },
      });
    }
  };
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
                handleSubmit;
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
  );
}
