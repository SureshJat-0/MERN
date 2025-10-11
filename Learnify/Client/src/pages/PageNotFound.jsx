import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <div className="flex gap-8">
        <Link to="/">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard/teacher">Teacher Dashboard</Link>
        <Link to="/dashboard/student">Student Dashboard</Link>
        <Link to="/courses/new">New Course</Link>
      </div>
      <br />
      <br />
      <h1>404 PageNotFound</h1>
    </div>
  );
}
