import Navbar from "../components/Navbar";
import NewCourse from "../components/NewCourse";
import TeacherDashboardAside from "../components/TeacherDashboardAside";

export default function NewCoursePage({ user }) {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8 sm:px-12 lg:px-20 py-8">
        <TeacherDashboardAside user={user}/>
        <NewCourse />
      </div>
    </>
  )
}
