import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Unauthorized from "./components/Unauthorized";
import PageNotFound from "./components/PageNotFound";
import CoursePage from "./layouts/CoursePage";
import HomePage from "./layouts/Homepage";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import TeacherDashboardPage from "./layouts/TeacherDashboardPage";
import NewCoursePage from "./layouts/NewCoursePage";
import LessonPage from "./layouts/LessonPage";
import CourseEditPage from "./layouts/CourseEditPage";
import StudentDashboardPage from "./layouts/StudentDashboardPage";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />;
  return children;
}

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Routes>
                <Route path="/" element={<TeacherDashboardPage />} />
                <Route
                  path="/course/new"
                  element={<NewCoursePage user={user} />}
                />
                <Route
                  path="/course/edit/:courseId"
                  element={<CourseEditPage />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/course/get/:courseId" element={<CoursePage />} />
        <Route path="/lesson/get/:lessonId" element={<LessonPage />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
