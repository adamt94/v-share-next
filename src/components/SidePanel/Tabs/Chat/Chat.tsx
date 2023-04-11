import { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import {
  TypedDocumentNode,
  gql,
  useQuery,
  useSubscription,
} from "@apollo/client";

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

  const {
    loading,
    error,
    data: { messagesBySentDate } = {},
    fetchMore,
  } = useQuery<MessagesBySentDateQueryResult, MessagesBySentDateQueryVariables>(
    MESSAGES_BY_SEND_DATE,
    {
      variables: {
        roomId: "?lobby=banter",
        sortDirection: "ASC",
        limit: 10,
      },
    }
  );
  //const { data } = useSubscription(onCreateMessage);

  console.log(messagesBySentDate);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessageList([...messageList, message]);
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex-grow overflow-auto">
        <Message message="You want some ill give it to ya" sender />
        <Message message="Na your fat m9" username="Scrub Lord" />
        {!loading &&
          messagesBySentDate.items.map((message) => (
            <Message message={message.text} />
          ))}
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
