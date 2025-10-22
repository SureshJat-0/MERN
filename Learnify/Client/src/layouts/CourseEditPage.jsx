import Navbar from "../components/Navbar";
import CourseAside from "../pages/CourseAside";
import CourseHeader from "../pages/CourseHeader";
import CourseLessons from "../pages/CourseLessons";
import EditCourseForm from "../pages/EditCourseForm";
import EditLessonForm from "../pages/EditLessonForm";
import NewLessonForm from "../pages/NewLessonForm";

export default function CourseEditPage() {
  return (
    <>
      <Navbar />
      <div className="px-8 sm:px-12 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CourseHeader />
            <CourseLessons />
          </div>
          <div className="lg:col-span-2">
          <CourseAside />
          <NewLessonForm />
          <EditCourseForm />
          <EditLessonForm />
          </div>
        </div>
      </div>
    </>
  );
}
