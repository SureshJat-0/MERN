import Navbar from "../components/Navbar";
import StudentAside from "../components/StudentAside";
import StudentDashboard from "../components/StudentDashboard";

export default function StudentDashboardPage() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8 sm:px-12 lg:px-20 py-8">
        <StudentAside />
        <StudentDashboard />
      </div>
    </>
  );
}
