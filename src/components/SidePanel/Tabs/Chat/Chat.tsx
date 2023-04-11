import { useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
export default function ChatTab() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
        {messageList.map((message) => (
          <Message message={message} sender />
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
