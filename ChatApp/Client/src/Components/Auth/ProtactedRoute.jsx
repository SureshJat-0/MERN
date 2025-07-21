import { useUser } from "../../context/User";
import { Navigate } from "react-router-dom";

export default function ProtactedRoute({ children }) {
  const { currentUser } = useUser();
  if (!currentUser) {
    alert("Login to acces Chat page.");
    return <Navigate to="/login" />;
  }
  return children;
}
