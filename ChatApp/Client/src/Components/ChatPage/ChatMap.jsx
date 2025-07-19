import MessageMap from "./MessageMap";

export default function ChatMap({ dbMessages, socketMessages }) {
  return (
    <div className="grow p-2">
      {/* messages from data base  */}
      <ul>
        {dbMessages.map((msg, index) => (
          <MessageMap value={{ msg, index }} key={index} />
        ))}
      </ul>
      {/* messages from socket  */}
      <ul>
        {socketMessages.map((message, index) => (
          <li key={index}>
            <span>{message.sender.username}</span> :{" "}
            <span>{message.message}</span>
          </li>
        ))}
      </ul>
      {/* typing indicator */}
      {/* <ul>{isTyping && <span>{chatUser.username} is typing...</span>}</ul> */}
    </div>
  );
}
