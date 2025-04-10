import { Link } from "react-router-dom";

export default function Result({ correctAns, length }) {
  return (
    <div className="flex flex-col items-center bg-white/30 border-white/30 backdrop-blur-lg rounded-lg px-40 py-8 shadow-lg">
      <p className="my-1 text-xl">You have completed the Quiz.</p>
      <p className="my-1 font-bold text-lg">Correct Answers : {correctAns}</p>
      <p className="my-1 text-xl">
        Your score is {(correctAns / length) * 100}%
      </p>
      <p className="my-1 font-bold text-lg">Thank You 😇</p>
      <Link to="/explore">
        <button className="rounded bg-purple-500 text-white px-6 py-2 ms-4 mt-4 shadow-md">
          Back to explore &gt;
        </button>
      </Link>
    </div>
  );
}
