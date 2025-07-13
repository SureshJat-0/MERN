import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    socketId: "",
  });
  const [chatUser, setChatUser] = useState(currentUser);
  const [currentGroup, setCurrentGroup] = useState(null);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        chatUser,
        setCurrentUser,
        setChatUser,
        currentGroup,
        setCurrentGroup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
