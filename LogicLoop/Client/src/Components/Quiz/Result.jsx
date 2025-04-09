import { Link } from "react-router-dom";

export default function Result() {
  return (
    <div className="flex flex-col items-center border rounded-lg px-40 py-8 shadow-lg">
      <p className="my-1 text-xl">You have completed the Quiz.</p>
      <p className="my-1 text-xl">Your score is 50%</p>
      <p className="my-1 font-bold text-lg">Thank You 😇</p>
      <Link to="/explore">
        <button className="rounded bg-purple-500 text-white px-6 py-2 ms-4 mt-4">
          Back to explore &gt;
        </button>
      </Link>
    </div>
  );
}
