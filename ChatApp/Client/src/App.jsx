import ChatPage from "./Pages/ChatPage";
import "./App.css";
import Groups from "./Pages/Groups";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="flex flex-row w-screen justify-start">
      <Groups />
      <ChatPage />
    </div>
    // <div className="">
    //   <Login />
    // </div>
  );
}

export default App;
