import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Register from "./pages/register";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PageNotFound from "./pages/PageNotFound";
import NewCourse from "./pages/NewCourse";
import CoursePage from "./layouts/CoursePage";
import EditCourse from "./pages/EditCourse";
import LessonPage from "./pages/LessonPage";
import HomePage from "./layouts/Homepage";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/new"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <NewCourse />
            </ProtectedRoute>
          }
        />

        <Route path="/courses/get/:courseId" element={<CoursePage />} />
        <Route path="/courses/edit/:courseId" element={<EditCourse />} />
        {/* <Route path="/lessons/new/:courseId" element={<NewLesson />} /> */}
        <Route path="/lessons/get/:lessonId" element={<LessonPage />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
