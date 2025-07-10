import { useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import UserMap from "../Components/ChatPage/UserMap";
import MessageMap from "../Components/ChatPage/MessageMap";

export default function ChatPage({ users, serverMsgs, groups }) {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { currentUser, chatUser, setChatUser, currentGroup, setCurrentGroup } =
    useUser();

  const handleMessageSend = (e) => {
    e.preventDefault();
    const messageData = {
      message,
      senderUsername: currentUser.username,
      groupChat: currentGroup,
    };
    if (chatUser) {
      messageData.receiverUsername = chatUser.username;
    }
    socket.emit("message", messageData);
    setMessage("");
  };
  const handleSelectUserForChat = (user) => {
    setCurrentGroup(null);
    setChatUser(user);
    socket.emit("userSelected", {
      currentUser,
      chatUser: user,
    });
  };
  const handleGroupClick = (e) => {
    const groupName = e.currentTarget.dataset.name;
    setCurrentGroup(groupName);
    socket.emit("groupJoin", groupName);
  };

  return (
    <div className="flex flex-row w-screen">
      {/* left  */}
      <div className="left w-[30vw] h-screen border-r">
        <div className="m-2 my-6">
          <h1 className="text-center m-2 text-xl">Groups</h1>
          <ul>
            {groups.map((group, index) => (
              <li
                key={index}
                onClick={handleGroupClick}
                data-name={group}
                className="py-2 px-4 cursor-pointer border m-2"
              >
                <span>{group}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="my-6">
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
      </div>
      {/* right  */}
      <div className="right w-[70vw] h-screen flex flex-col">
        <div className="text-center text-2xl m-2">
          {currentGroup
            ? currentGroup
            : chatUser.username
            ? chatUser.username
            : "Select Chat"}
        </div>
        <hr />
        <div className="grow p-2">
          <ul>
            {serverMsgs.map((msg, index) => (
              <MessageMap value={{ msg, index }} key={index} />
            ))}
          </ul>
        </div>
        <hr />
        <div className="w-full">
          <form onSubmit={handleMessageSend}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Message..."
              className="text-lg m-2 w-[90%] p-2 border rounded"
            />
            <button
              type="submit"
              className="border p-2 m-1 cursor-pointer rounded"
            >
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
