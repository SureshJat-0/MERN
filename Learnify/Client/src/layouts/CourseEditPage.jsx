import Navbar from "../components/Navbar";
import CourseAside from "../components/CourseAside";
import CourseHeader from "../components/CourseHeader";
import CourseLessons from "../components/CourseLessons";
import EditCourseForm from "../components/EditCourseForm";
import EditLessonForm from "../components/EditLessonForm";
import NewLessonForm from "../components/NewLessonForm";

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
