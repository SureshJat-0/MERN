import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Page404() {
  return (
    <div className="flex">
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/77/3f/d3/773fd33365b769d58db4d00445ec5046.jpg')",
        }}
        className="flex flex-col items-center h-screen w-screen overflow-hidden bg-no-repeat bg-cover p-12"
      >
        <h1 className="text-4xl font-bold text-zinc-800">
          Seems like you are lost.
        </h1>
        <h2 className="text-9xl font-bold text-[#CACACA]">404</h2>
        <h2 className="text-2xl font-bold text-zinc-800">Page not found</h2>
        <Link to="/">
          <span className="flex items-center cursor-pointer">
            <ArrowBackIosIcon fontSize="small" className="my-2" />
            Go back
          </span>{" "}
        </Link>
      </div>
    </div>
  );
}
