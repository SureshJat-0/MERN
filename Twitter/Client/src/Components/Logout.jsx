import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ handleSetUser }) {
  const navigate = useNavigate();
  const [flashMsg, setFlashMsg] = useState("");

  const handleLogout = async () => {
    await axios
      .get("/api/auth/logout")
      .then(async(res) => {
        console.log("Loggeout successful!");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleLogout();
    handleSetUser(null);
    navigate("/");
  }, []);
  return <></>;
}
