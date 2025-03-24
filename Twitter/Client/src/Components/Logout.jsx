import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ handleSetUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("/api/auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleLogout();
    handleSetUser(null);
    navigate("/");
  }, []);
  return <></>;
}
