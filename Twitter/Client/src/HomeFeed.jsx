import Aside from "./Components/Aside";
import Feed from "./Components/Feed";
import Navbar from "./Components/Navbar";

export default function HomeFeed({ user }) {
  return (
    <div className="flex flex-wrap justify-end text-white mx-24">
      <Navbar />
      <Feed user={user} />
      <Aside />
    </div>
  );
}
