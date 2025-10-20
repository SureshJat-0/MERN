import React from "react";
import { Link } from "react-router-dom";

export default function CourseBox({ course, ind }) {
  return (
    <article className="bg-gray-800/60 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <Link to={`/courses/get/${course._id}`} data-link className="block">
        <img
          key={ind}
          src="https://fastly.picsum.photos/id/496/400/240.jpg?hmac=Vhi14lCXpW_i6i_J5-SceFlvQXUrKtt2_wG4ekNUyeE"
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/courses/get/${course._id}`}
          data-link
          className="text-lg font-semibold hover:text-rose-400"
        >
          {course.title}
        </Link>
        <p className="text-sm text-gray-400 mt-2">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-400">By {/*c.author*/}Jone doe</div>
          <Link
            to={`/courses/get/${course._id}`}
            data-link
            className="text-sm text-rose-500 hover:underline"
          >
            View course →
          </Link>
        </div>
      </div>
    </article>
  );
}
