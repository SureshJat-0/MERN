import Navbar from "../components/Navbar";
import NewCourse from "../pages/NewCourse";
import TeacherDashboardAside from "../pages/TeacherDashboardAside";

export default function NewCoursePage() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8 sm:px-12 lg:px-20 py-8">
        <TeacherDashboardAside />
        <NewCourse />
      </div>
    </>
  )
}
