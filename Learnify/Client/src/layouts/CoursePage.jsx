import Navbar from "../components/Navbar";
import CourseHeader from "../components/CourseHeader";
import CourseLessons from "../components/CourseLessons";

export default function CoursePage() {
  return (
    <>
      <Navbar />
      <div className="px-8 sm:px-12 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <CourseHeader />
            <CourseLessons />
          </div>
        </div>
      </div>
    </>
  );
}
