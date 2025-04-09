import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="flex flex-1 justify-center items-center flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1681433426886-3d6d17f79d53?q=80&w=3229&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <h1 className="text-4xl my-2">
        Introducing{" "}
        <span className="text-purple-500 font-bold"> LogicLoop Web </span>
      </h1>
      <p className="text-6xl font-bold text-center leading-tight">
        "Everyone loves sport. <br />
        And everyone loves a quiz."
      </p>
      <p className="text-xl text-gray-600 font-bold my-2">-Sue Barker</p>
      <hr className="w-1/2 border-t-2 border-gray-400 my-6" />
      <div className="flex">
        <button className="py-2 px-6 bg-purple-600 text-white rounded-lg text-lg mx-4">
          Sign up for free {">"}
        </button>
        <Link to="/explore">
          {" "}
          <button className="py-2 px-6 bg-gray-200 text-purple-900 rounded-lg text-lg mx-4">
            Explore {">"}
          </button>
        </Link>
      </div>
    </div>
  );
}
