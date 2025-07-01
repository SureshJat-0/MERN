import { useEffect, useState } from "react";
import "./App.css";
import NicknameForm from "./Components/NicknameForm";
import MessageForm from "./Components/MessageForm";
import {
  handleNicknameSet,
  handleMessageSend,
  useSocketHandler,
} from "./Handlers/Handlers";

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [messagesData, setMessagesData] = useState([]);

  useSocketHandler(setMessagesData);

  return (
    <>
      <h1>Chap App</h1>
      <NicknameForm
        handleNicknameSet={(e) => {
          handleNicknameSet(e, nicknameInput, setNicknameInput);
        }}
        nicknameInput={nicknameInput}
        setNicknameInput={setNicknameInput}
      />
      <MessageForm
        handleMessageSend={(e) => {
          handleMessageSend(e, messageInput, setMessageInput);
        }}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
      />

      <div>
        <ul style={{ listStyle: "none", textAlign: "left" }}>
          {messagesData.map((data, index) => (
            <li key={index}>{`${data.senderNickname}: ${data.msg}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
