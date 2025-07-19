import { useEffect, useRef } from "react";
import MessageMap from "./MessageMap";

export default function ChatMap({ dbMessages, socketMessages }) {
  // auto scroll on message
    const bottomRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages, dbMessages]);

  return (
    <div className="grow p-4 overflow-y-auto">
      {/* messages from data base  */}
      <ul className="flex flex-col">
        {dbMessages.map((message, index) => (
          <MessageMap value={{ message, index }} key={index} />
        ))}
      </ul>
      {/* messages from socket  */}
      <ul>
        {socketMessages.map((message, index) => (
          <MessageMap value={{ message, index}} key={index} />
        ))}
      </ul>
      <div ref={bottomRef}></div>
      {/* typing indicator */}
      {/* <ul>{isTyping && <span>{chatUser.username} is typing...</span>}</ul> */}
    </div>
  );
}
