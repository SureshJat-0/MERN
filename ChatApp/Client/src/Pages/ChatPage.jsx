import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import UserMap from "../Components/ChatPage/UserMap";
import MessageMap from "../Components/ChatPage/MessageMap";
import axios from "axios";

export default function ChatPage() {
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
  const [groups, setGroups] = useState(["General", "Random"]);
  // messages from database
  const [dbMessages, setDbMessages] = useState([]);
  // messages from socket
  const [socketMessages, setSocketMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isTimeout, setIsTimeout] = useState();

  // whenever user refresh chat page
  async function setUsersAndLoginUser() {
    const loginUserRes = await axios.get("/api/user/profile");
    setCurrentUser(loginUserRes.data.user);
    const usersRes = await axios.get("/api/user/users");
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


  // socket messages
  useEffect(() => {
    socket.on('chat', (messageData) => {
      setSocketMessages((prevVal) => [...prevVal, messageData]);
    });
  }, [socket]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const messageObj = {
      message,
      sender: currentUser,
    };
    if (chatUser) {
      messageObj.receiver = chatUser;
    }
    if (currentGroup) {
      messageObj.group = currentGroup;
    }
    // to store on database
    axios
      .post("/api/chat/message", messageObj, { withCredentials: true })
      .then((res) => {})
      .catch((err) => console.log(err));
    // send via socket
    socket.emit('message', messageObj)
    setMessage("");
  };

  async function setAllMessagesFromDb(current) {
    // current could be chatUser or group
    let messageObj = {
      senderUsername: currentUser.username,
    };
    if (current?.username) {
      messageObj.receiverUsername = current.username;
    } else {
      messageObj.groupName = current;
    }
    const messagesRes = await axios.post("/api/chat/messages", messageObj, {
      withCredentials: true,
    });
    setDbMessages(messagesRes.data);
  }

  const handleSelectUserForChat = async (user) => {
    setSocketMessages([]);
    setCurrentGroup(null);
    setChatUser(user);
    setAllMessagesFromDb(user); // here user is chatUser
    // join the room to chat
    socket.emit("userSelected", {
      currentUser,
      chatUser: user,
    });
  };
  const handleSelectGroupForChat = async (e) => {
    setSocketMessages([]);
    setChatUser(null);
    const groupName = e.currentTarget.dataset.name;
    setCurrentGroup(groupName);
    setAllMessagesFromDb(groupName);
    socket.emit("groupJoin", groupName); // here username is group name
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
          <h1 className="text-center m-2 text-xl">Public Channels</h1>
          <ul>
            {groups.map((group, index) => (
              <li
                key={index}
                onClick={handleSelectGroupForChat}
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
          {/* messages from data base  */}
          <ul>
            {dbMessages.map((msg, index) => (
              <MessageMap value={{ msg, index }} key={index} />
            ))}
          </ul>
          {/* messages from socket  */}
          <ul>
            {
              socketMessages.map((message, index) => (
                <li key={index}><span>{message.sender.username}</span> : <span>{message.message}</span></li>
              ))
            }
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
