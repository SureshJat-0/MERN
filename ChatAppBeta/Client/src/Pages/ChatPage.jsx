import { useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import UserMap from "../Components/ChatPage/UserMap";
import MessageMap from "../Components/ChatPage/MessageMsp";

export default function ChatPage({ users, serverMsgs }) {
  const socket = useSocket();
  const [messageInput, setMessageInput] = useState("");
  const { currentUser, chatUser, setCurrentUser, setChatUser } = useUser();

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("message", {
      messageInput,
      senderSocketId: socket.id,
      senderUsername: currentUser.username,
      receiverUsername: chatUser.username,
      receiverSocketId: chatUser.socketId,
    });
    setMessageInput("");
  };
  const handleSelectUserForChat = (user) => {
    setChatUser(user);
    socket.emit("userSelected", {
      currentUser,
      chatUser: user,
    });
  };

  return (
    <div className="flex flex-row w-screen">
      {/* left  */}
      <div className="left w-[30vw] h-screen border-r">
        <h1 className="text-center m-2 text-xl">Available Users</h1>
        <ul>
          {users.map((user, index) => (
            <UserMap
              value={{ user, index, handleSelectUserForChat }}
              key={index}
            />
          ))}
        </ul>
      </div>
      {/* right  */}
      <div className="right w-[70vw] h-screen flex flex-col">
        <div className="text-center">General</div>
        <div className="grow">
          <ul>
            {serverMsgs.map((msg, index) => (
              <MessageMap values={{ msg, index }} key={index} />
            ))}
          </ul>
        </div>
        <div className="w-full">
          <form onSubmit={handleMessageSend}>
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              type="text"
              placeholder="Message..."
              className="text-lg m-2 w-[90%] p-2"
            />
            <button type="submit" className="border p-2 m-1 cursor-pointer">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
