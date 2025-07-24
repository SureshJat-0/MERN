import { useEffect, useRef, useState } from "react";
import MessageMap from "./MessageMap";
import { useUser } from "../../context/User";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatMap({
  dbMessages,
  socketMessages,
  messageLoading,
}) {
  // auto scroll on message
  const bottomRef = useRef(null);
  const { chatUser, currentGroup } = useUser();
  const [isMessagesLengthZero, setIsMessagesLengthZero] = useState(
    dbMessages.length == 0 && socketMessages.length
  ); // is any message for chat

  useEffect(() => {
    // Scroll to the bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // check for messages
    setIsMessagesLengthZero(
      dbMessages.length == 0 && socketMessages.length == 0
    );
  }, [socketMessages, dbMessages]);

  return (
    <div className="grow p-4 overflow-y-auto">
      {isMessagesLengthZero && (
        <div className="h-full font-bold text-2xl flex justify-center items-center">
          {messageLoading ? (
            <CircularProgress />
          ) : (
            <span>
              Start Chat with {chatUser?.username || currentGroup + " chanel"}
            </span>
          )}
        </div>
      )}
      {/* messages from data base  */}
      <ul className="flex flex-col">
        {dbMessages.map((message, index) => (
          <MessageMap value={{ message, index }} key={index} />
        ))}
      </ul>
      {/* messages from socket  */}
      <ul>
        {socketMessages.map((message, index) => (
          <MessageMap value={{ message, index }} key={index} />
        ))}
      </ul>
      <div ref={bottomRef}></div>
    </div>
  );
}
