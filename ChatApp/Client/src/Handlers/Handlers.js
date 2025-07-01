import socket from "../socket";
import { useEffect } from "react";

const handleDeliveredToUser = (data) => {
  console.log(
    `Message delivered to "${data.receiverNickname}" with Id:${data.receiverId}`
  );
};
const handleChatMessage = (data, setMessagesData) => {
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
const handleNicknameSet = (e, nicknameInput, setNicknameInput) => {
  e.preventDefault();
  if (nicknameInput.trim()) {
    // set-nickname
    socket.emit("set-nickname", nicknameInput.trim());
    setNicknameInput("");
  }
};
const handleMessageSend = (e, messageInput, setMessageInput) => {
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

const useSocketHandler = (setMessagesData) => {
  useEffect(() => {
    const chatHandler = (data) => {
      handleChatMessage(data, setMessagesData);
    };
    socket.on("chat-msg", chatHandler);
    socket.on("delivered-to-user", handleDeliveredToUser);

    return () => {
      socket.off("chat-msg", chatHandler);
      socket.off("delivered-to-user", handleDeliveredToUser);
    };
  }, []);
};

export { handleNicknameSet, handleMessageSend, useSocketHandler };
