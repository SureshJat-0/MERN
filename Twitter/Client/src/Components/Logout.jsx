import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ handleSetUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("/api/auth/logout")
      .then((res) => {
        console.log("Logout successful!");
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
