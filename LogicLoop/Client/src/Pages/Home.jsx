import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Animation on text
  let [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const textAnimationStyle = () => {
    return `transition-all ease-out duration-700 ${
      show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
    }`;
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col">
      <h1 className={`text-4xl my-2 ${textAnimationStyle()}`}>
        Introducing
        <span className="text-purple-500 font-bold"> LogicLoop Web </span>
      </h1>
      <p
        className={`text-6xl font-bold text-center leading-tight ${textAnimationStyle()}`}
      >
        "Everyone loves sport. <br />
        And everyone loves game."
      </p>
      <p
        className={`text-xl text-gray-600 font-bold my-2 ${textAnimationStyle()}`}
      >
        -Suresh Jat
      </p>
      <hr className="w-1/2 border-t-2 border-gray-400 my-6" />
      <div className="flex">
        <button className="py-2 px-6 bg-purple-600 text-white rounded-lg text-lg mx-4 shadow-lg hover:scale-105 transition-transform ease-in duration-200">
          <Link to="/signup"> Sign up for free {">"}</Link>
        </button>
        <Link to="/explore">
          {" "}
          <button className="py-2 px-6 bg-gray-200 text-purple-900 rounded-lg text-lg mx-4 shadow-lg hover:scale-105 transition-transform ease-in duration-200">
            Explore &gt;
          </button>
        </Link>
      </div>
    </div>
  );
}
