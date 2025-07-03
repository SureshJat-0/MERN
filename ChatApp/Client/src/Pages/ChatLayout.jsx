import ChatPage from "./ChatPage";
import Groups from "./Groups";

export default function ChatLayout() {
    return(
        <div className="flex flex-row w-screen justify-start">
                <Groups />
                <ChatPage />
              </div>
    );
}