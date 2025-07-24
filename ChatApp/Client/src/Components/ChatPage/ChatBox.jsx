import { useUser } from "../../context/User";
import ChatHeader from "./ChatHeader";
import ChatMap from "./ChatMap";
import ChatInput from "./ChatInput";
import FitbitIcon from "@mui/icons-material/Fitbit";

export default function ChatBox({
  dbMessages,
  socketMessages,
  message,
  messageLoading,
  setMessage,
  handleMessageSend,
}) {
  const { chatUser, currentGroup } = useUser();
  if (chatUser || currentGroup) {
    return (
      <>
        <ChatHeader currentGroup={currentGroup} chatUser={chatUser} />
        <ChatMap dbMessages={dbMessages} socketMessages={socketMessages} messageLoading={messageLoading}/>
        <ChatInput
          message={message}
          handleMessageSend={handleMessageSend}
          setMessage={setMessage}
        />
      </>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80%] mb-8">
        <FitbitIcon sx={{ fontSize: 60 }} />
        <p className="text-3xl font-bold">Select User or Channel for Chat</p>
      </div>
    );
  }
}
