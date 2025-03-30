import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Upload({ addArticle, user }) {
  let initPostInfo = {
    article: "",
    imgUrl: "",
  };

  // state variables
  let [postInfo, setPostInfo] = useState(initPostInfo);

  // handling input changes in the text fields
  let handleInputChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  // handle submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (postInfo.article === "" || !postInfo.imgUrl) return;
    if (!user) {
      await axios.post(
        "/api/flash/info",
        { infoMsg: "You must be loggedIn to post Article" },
        { withCredentials: true }
      );
      navigate("/login");
      return;
    }
    let newArticle = {
      userName: user.username,
      article: postInfo.article,
      imgUrl: postInfo.imgUrl,
    };
    addArticle(newArticle);
    setPostInfo(initPostInfo);
  };

  // Increse the height when Enter key is pressed
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [postInfo.article]);

  // till here

  return (
    <div className="px-4 border border-t-0 border-zinc-600">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          ref={textareaRef}
          name="article"
          id="autoExpand"
          value={postInfo.article}
          type="text"
          placeholder="What is happening?!"
          rows={1}
          onChange={handleInputChange}
          className="w-full pt-4 outline-none text-xl min-h-xl max-h-[60vh] overflow-y-auto"
          required
        >
          {postInfo.article}
        </textarea>
        <br />
        <input
          name="imgUrl"
          placeholder="Image url"
          type="text"
          value={postInfo.imgUrl}
          onChange={handleInputChange}
          className="outline-none"
          required
        />
        <div className="flex justify-between mb-4">
          {/* file field  */}
          {/* <input
            name="avatar"
            type="file"
            onChange={handleFileChange}
            className="px-4 mt-2 outline-non h-8 w-68 text-lg border border-zinc-600 rounded-full"
          /> */}
          <button
            type="submit"
            className="bg-zinc-500 font-bold text-black text-lg py-1 px-5 rounded-full mx-4 my-2 hover:cursor-pointer"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
