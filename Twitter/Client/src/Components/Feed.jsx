import Upload from "./Upload";
import AllPosts from "./AllPosts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Feed({ user, profileFeed }) {
  let [posts, setPosts] = useState([]);
  let location = useLocation();

  let addArticle = async (newArticle) => {
    await axios.post("/api/data", newArticle);
    setPosts([newArticle, ...posts]);
  };

  // getting posts data from the backend
  let getPostData = async () => {
    try {
      let data = await axios.get("/api/data");
      setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="w-[45vw] border border-t-0 border-zinc-600 border-y-0 ms-20">
      <Upload addArticle={addArticle} user={user} />
      <AllPosts
        allPosts={location.pathname === "/" ? posts : profileFeed}
        user={user}
      />
    </div>
  );
}
