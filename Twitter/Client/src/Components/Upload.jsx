import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Upload({ addArticle, user }) {
  let initPostInfo = {
    userName: "",
    article: "",
    imgUrl: '',
  };

  // state variables
  let [postInfo, setPostInfo] = useState(initPostInfo);
  // let [file, setFile] = useState(null);

  // handling input changes in the text fields and file fields
  let handleInputChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  // let handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const navigate = useNavigate();
  // handle submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (postInfo.article === "" || !postInfo.userName || !postInfo.imgUrl) return;
    if (!user) {
      navigate('/login');
      return;
    }
    let newArticle = {
      userName: postInfo.userName,
      article: postInfo.article,
      imgUrl: postInfo.imgUrl,
    };
    addArticle(newArticle);

    // preparing form data
    // let formData = new FormData();
    // formData.append("userName", postInfo.userName);
    // formData.append("article", postInfo.article);
    // formData.append("avatar", file);
    // reseting form
    setPostInfo(initPostInfo);
    // setFile(null);

    // sending data to BackEnd
    // try {
    //   await axios.post("/api/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // Misunderstanding
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [postInfo.article]); // Runs when text changes

  // till here

  return (
    <div className="px-4 border border-zinc-600">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="userName"
          placeholder="User Name"
          type="text"
          value={postInfo.userName}
          onChange={handleInputChange}
          className=""
          required
        />
        <input
          name="imgUrl"
          placeholder="Image url"
          type="text"
          value={postInfo.imgUrl}
          onChange={handleInputChange}
          className=""
          required
        />
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
            className="bg-zinc-500 text-black text-lg py-1 px-5 rounded-full mx-4 my-2"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
