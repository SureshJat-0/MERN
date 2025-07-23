import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";
import axios from "axios";
import UsersChatPanel from "../Components/ChatPage/UsersChatPanel";
import GroupsChatPanel from "../Components/ChatPage/GroupsChatPanel";
import Navbar from "../Components/Navbar/Navbar";
import ChatBox from "../Components/ChatPage/ChatBox";
import { useSnackbar } from "../context/Snackbar";

export default function ChatPage() {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { showSnackbar } = useSnackbar();
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

  // socket messages
  const handlemessageData = (messageData) => {
    setSocketMessages((prevVal) => [...prevVal, messageData]);
  };
  useEffect(() => {
    socket.on("chat", handlemessageData);
    return () => {
      socket.off("chat", handlemessageData);
    };
  }, [socket]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    setMessage(message.trim());
    if (!message) return showSnackbar("Message require!");
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
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/message`,
        messageObj,
        { withCredentials: true }
      )
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
      const messagesRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/messages`,
        messageObj,
        {
          withCredentials: true,
        }
      );
      setDbMessages(messagesRes.data);
    } catch (err) {
      console.log("Error in getting messages");
    }
  }

  const handleSelectUserForChat = async (user) => {
    setSocketMessages([]);
    setCurrentGroup(null);
    setChatUser(user);
    setAllMessagesFromDb(user);
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

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="w-[30vw] max-h-screen border-r border-gray-300 felx flex-col">
        <GroupsChatPanel
          groups={groups}
          handleSelectGroupForChat={handleSelectGroupForChat}
        />
        <UsersChatPanel
          users={users}
          handleSelectUserForChat={handleSelectUserForChat}
        />
      </div>
      <div className="w-[70vw] h-screen flex flex-col">
        <ChatBox
          message={message}
          setMessage={setMessage}
          handleMessageSend={handleMessageSend}
          dbMessages={dbMessages}
          socketMessages={socketMessages}
        />
      </div>
    </div>
  );
}
