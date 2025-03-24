import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <h1 className="text-white text-5xl text-center p-8">Profile</h1>
    </>
  );
}
