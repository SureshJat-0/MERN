import { Link } from "react-router-dom";

export default function ExploreCard({ path, imgUrl, title, imgAlt }) {
  return (
    <Link to={path} className="h-full">
      <div className="flex flex-col justify-between h-full rounded-lg cursor-pointer shadow-lg hover:scale-105  transition-transform duration-500 bg-white/30 backdrop-blur-sm">
        <img
          className="rounded-t-lg object-cover h-72"
          src={imgUrl}
          alt={imgAlt}
        />
        <p className="mx-6 my-2 pb-2">{title} &gt;</p>
      </div>
    </Link>
  );
}
