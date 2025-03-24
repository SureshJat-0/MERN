import Upload from "./Upload";
import AllPosts from "./AllPosts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed({user}) {
  let [posts, setPosts] = useState([]);

  let addArticle = async (newArticle) => {
    await axios.post('/api/data', newArticle);
    setPosts([...posts, newArticle]);
  };

  // getting posts data from the backend
  let getPostData = async () => {
    try{
      let data = await axios.get("/api/data");
      setPosts(data.data);
    } catch(err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostData();
  });

  return (
    <div className="w-[45vw] border border-zinc-600 border-y-0">
      <Upload addArticle={addArticle} user={user}/>
      <AllPosts allPosts={posts} />
    </div>
  );
}
