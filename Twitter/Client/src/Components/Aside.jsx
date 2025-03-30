import axios from "axios";
import { useEffect, useState } from "react";

export default function Aside() {
  let [successMsg, setSuccessMsg] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    getFlashMsg();
  }, []);

  const getFlashMsg = async () => {
    let res = await axios.get("/api/flash/show");
    setSuccessMsg(res.data.success[0]);
    setErrorMsg(res.data.error[0]);
    setInfoMsg(res.data.info[0]);
  };

  return (
    <div className="w-[25vw] h-8 min-h-screen text-white m-4 p-4 sticky top-0">
      {/* flashMsg box */}
      <div className="">
        {successMsg && (
          <p className="border rounded-lg border-green-600 bg-green-950 px-4 py-2 mb-4 text-green-300">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="border rounded-lg border-red-600 bg-red-950 px-4 py-2 mb-4 text-red-300">
            {errorMsg}
          </p>
        )}
        {infoMsg && (
          <p className="border rounded-lg border-red-600 bg-red-950 px-4 py-2 mb-4 text-red-300">
            {infoMsg}
          </p>
        )}
      </div>

      {/* first box  */}
      <div className="border rounded-2xl border-zinc-600 p-4">
        <h2 className="font-bold text-2xl">Subscribe to Premium</h2>
        <p className="text-base mt-2">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="bg-blue-500 font-bold px-4 py-2 rounded-2xl mt-4 cursor-pointer">
          Subscribe
        </button>
      </div>

      {/* second box  */}
      <div className="border rounded-2xl border-zinc-600 p-4 mt-4">
        <h2 className="font-bold text-2xl">What's happening</h2>
        <div className="mt-2 flex">
          <img
            className="w-25 rounded-xl"
            src="https://pbs.twimg.com/semantic_core_img/1875997496851263488/BLI4C75l?format=jpg&name=360x360"
            alt="img"
          />
          <div className="ms-2">
            <p className="">Khloé in Wonder Land</p>
            <p className="text-zinc-500 text-sm">LIVE</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="">#JoinIndianArmy</p>
          <p className="text-sm text-zinc-500">
            Join the Indian Army as an Agniveer and Serve with Pride
          </p>
        </div>
        <div className="mt-4">
          <p className="">#ghiblistyle</p>
          <p className="text-sm text-zinc-500">Trending in India</p>
        </div>
        <div className="mt-4">
          <p className="">#SalmanKhan</p>
          <p className="text-sm text-zinc-500">Entertainment · Trending</p>
        </div>
        <div className="mt-4">
          <p className="">#TrainAccident</p>
          <p className="text-sm text-zinc-500">Travel · Trending</p>
        </div>
      </div>
    </div>
  );
}
