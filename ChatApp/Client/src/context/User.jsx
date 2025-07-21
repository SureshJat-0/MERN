import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/status", { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.user);
      })
      .catch((err) => {
        console.log("Error while getting auth");
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        chatUser,
        currentGroup,
        users,
        setCurrentUser,
        setChatUser,
        setCurrentGroup,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
