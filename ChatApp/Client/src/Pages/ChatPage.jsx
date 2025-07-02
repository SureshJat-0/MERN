import { useEffect, useRef, useState } from "react";
import "../App.css";
import NicknameForm from "../Components/NicknameForm";
import MessageForm from "../Components/MessageForm";
import { useSocket } from "../Context/Socket";
import { useUser } from "../Context/User";

export default function ChatPage() {
  const [messageInput, setMessageInput] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const messageContainerRef = useRef(null);
  const socket = useSocket();
  const { mySocketId, setMySocketId, nicknameInput, setNicknameInput} = useUser();

  // handler function
  const handleDeliveredToUser = (data) => {
    console.log(
      `Message delivered to "${data.receiverNickname}" with Id:${data.receiverId}`
    );
  };
  const handleChatMessage = (data) => {
    console.log("Data from server: ", data);
    setMessagesData((prevVal) => [...prevVal, data]);
    // sending ack to server that we receive the data
    socket.emit("delivery-ack", {
      msg: data.msg,
      senderId: data.senderId,
      senderNickname: data.senderNickname,
    });
    // getting delivered-to-user ack
  };
  const handleNicknameSet = (e) => {
    e.preventDefault();
    if (nicknameInput.trim()) {
      // set-nickname
      socket.emit("set-nickname", nicknameInput.trim());
      setNicknameInput("");
    }
  };
  const handleMessageSend = (e) => {
    e.preventDefault();
    // sending to server
    if (messageInput.trim()) {
      socket.emit("message", messageInput.trim(), (data) => {
        // ack from the server
        console.log("Server acknowledge: ", data);
      });
      setMessageInput("");
    }
  };

  useEffect(() => {
    // setting auto scroll
    const messageDiv = messageContainerRef.current;
    if (messageDiv) {
      messageDiv.scrollTo({
        top: messageDiv.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData]);

  useEffect(() => {
    // handling income chat-msg
    socket.on("chat-msg", handleChatMessage);
    // sending ack that we receive that msg
    socket.on("delivered-to-user", handleDeliveredToUser);

    return () => {
      // Removing socket listner
      socket.off("chat-msg", handleChatMessage);
      socket.off("delivered-to-user", handleDeliveredToUser);
    };
  }, [socket]);

  // setting up mySocketID
  useEffect(() => {
    if(socket.connected) {
      setMySocketId(socket?.id || '');
    } else {
      socket.on('connect', () => setMySocketId(socket?.id || ''));
    }
  }, [])

  return (
    <div className="flex flex-col h-screen w-[75vw]">
      <NicknameForm
        handleNicknameSet={handleNicknameSet}
        nicknameInput={nicknameInput}
        setNicknameInput={setNicknameInput}
      />

      <div ref={messageContainerRef} className="m-4 grow overflow-y-auto">
        <ul className={"list-none"}>
          {messagesData.map((data, index) => {
            const isMessageOwner = mySocketId === data.senderId;
            return (
              <li key={index} className={`m-4 flex ${isMessageOwner ? 'justify-end' : 'justify-start'}`}>
                <span className="bg-zinc-800 px-4 py-2 rounded-2xl max-w-[75%]">{`${data.senderNickname}: ${data.msg}`}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <MessageForm
        handleMessageSend={handleMessageSend}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
      />
    </div>
  );
}
