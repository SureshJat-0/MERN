import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import axios from "axios";
import UsersChatPanel from "../Components/ChatPage/UsersChatPanel";
import GroupsChatPanel from "../Components/ChatPage/GroupsChatPanel";
import ChatHeader from "../Components/ChatPage/ChatHeader";
import ChatMap from "../Components/ChatPage/ChatMap";
import ChatInput from "../Components/ChatPage/ChatInput";
import Navbar from "../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatPage() {
  const socket = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
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
  const handlemessageData = (messageData) => {
      setSocketMessages((prevVal) => [...prevVal, messageData]);
    }
  useEffect(() => {
    socket.on("chat", handlemessageData);
    return () => {
      socket.off("chat", handlemessageData)
    }
  }, [socket]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    setMessage(message.trim());
    if (!message) return alert("Message require!");
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
      .then(() => console.log("Message send successfuly!"))
      .catch((err) => console.log("Message send error!", err));
    // send via socket
    socket.emit("message", messageObj);
    setMessage("");
  };

  async function setAllMessagesFromDb(current) {
    // current could be chatUser or group
    let messageObj = {
      senderUsername: currentUser.username,
    };
    if (current.username) {
      messageObj.receiverUsername = current.username;
    } else {
      messageObj.groupName = current;
    }
    try {
      const messagesRes = await axios.post("/api/chat/messages", messageObj, {
        withCredentials: true,
      });
      setDbMessages(messagesRes.data);
    } catch (err) {
      console.log("Error in getting messages");
    }
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
  // const handleMessageInputChange = (e) => {
  //   const text = e.target.value;
  //   setMessage(text);
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
  // };

  return (
    <div className="flex flex-row w-screen h-screen">
      <Navbar />
      <div className="left w-[30vw] h-screen border-r border-gray-300 felx flex-col">
        <GroupsChatPanel
          groups={groups}
          handleSelectGroupForChat={handleSelectGroupForChat}
        />
        <UsersChatPanel
          users={users}
          handleSelectUserForChat={handleSelectUserForChat}
        />
      </div>
      <div className="right w-[70vw] h-screen flex flex-col">
        <ChatHeader currentGroup={currentGroup} chatUser={chatUser} />
        <ChatMap dbMessages={dbMessages} socketMessages={socketMessages} />
        <ChatInput
          message={message}
          handleMessageSend={handleMessageSend}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
