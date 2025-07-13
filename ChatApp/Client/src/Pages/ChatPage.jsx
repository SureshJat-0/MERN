import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import UserMap from "../Components/ChatPage/UserMap";
import MessageMap from "../Components/ChatPage/MessageMap";
import axios from "axios";

export default function ChatPage({ serverMsgs, groups }) {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    chatUser,
    setChatUser,
    currentGroup,
    setCurrentGroup,
  } = useUser();
  const [isTyping, setIsTyping] = useState(false);
  const [isTimeout, setIsTimeout] = useState();

  // whenever user refresh chat page
  async function setUsersAndLoginUser() {
    const res = await axios.get("/api/user/profile");
    setCurrentUser(res.data.user);
    const usersRes = await axios.get('/api/user/users');
    setUsers(usersRes.data);
  }
  useEffect(() => {
    setUsersAndLoginUser();
  }, []);

  // useEffect(() => {
  //   socket.on("user-typing", () => {
  //     setIsTyping(true);
  //   });
  //   socket.on("user-stop-typing", () => {
  //     setIsTyping(false);
  //   });
  // }, [socket]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const messageData = {
      message,
      senderUsername: currentUser.username,
    };
    if (currentGroup) {
      messageData.currentGroup = currentGroup;
    }
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
  const handleMessageInputChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    // handling typing indicator
    // const typingData = {
    //   currentUser,
    // };
    // if (chatUser) typingData.chatUser = chatUser;
    // if (currentGroup) typingData.currentGroup = currentGroup;

    // if (text) {
    //   socket.emit("typing", typingData);
    //   // clearing previous timeout if user is still typing
    //   if (isTimeout) clearTimeout(isTimeout);
    //   // creating new timeout
    //   // This way only last time out will work
    //   const timeout = setTimeout(() => {
    //     socket.emit("stop-typing", typingData);
    //   }, 2500);
    //   setIsTimeout(timeout);
    // } else {
    //   socket.emit("stop-typing", typingData);
    // }
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
          <h1 className="text-center m-2 text-xl">All Users</h1>
          <ul>
            {users?.map((user) => (
              <UserMap
                user={user}
                fun={handleSelectUserForChat}
                key={user._id}
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
            : chatUser?.username
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
          {/* typing indicator */}
          <ul>{isTyping && <span>{chatUser.username} is typing...</span>}</ul>
        </div>
        <hr />
        {/* message input */}
        <div className="w-full">
          <form onSubmit={handleMessageSend}>
            <input
              value={message}
              onChange={handleMessageInputChange}
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
