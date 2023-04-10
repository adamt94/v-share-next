import { useState } from "react";
import Message from "./Chat/Message";

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
          <Message message={message} />
        ))}
      </div>
      <div className="surface-1 p-4 flex-shrink">
        <form onSubmit={handleSubmit}>
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm surface on-surface-text"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your message…"
          />
        </form>
      </div>
    </>
  );
}
