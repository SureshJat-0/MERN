import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Aside from "./Aside";
import Feed from "./Feed";
import axios from "axios";

export default function Profile({ user }) {
  const navigate = useNavigate();
  const [profileArticles, setProfileArticles] = useState([]);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    getProfileFeed();
  }, [user, navigate]);

  const getProfileFeed = async () => {
    await axios
      .get("/api/data/profile")
      .then((res) => {
        setProfileArticles(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-wrap justify-end text-white mx-24">
        <Navbar />
        <Feed user={user} profileFeed={profileArticles} />
        <Aside />
      </div>
    </>
  );
}
