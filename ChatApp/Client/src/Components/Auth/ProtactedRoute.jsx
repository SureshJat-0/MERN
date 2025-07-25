import { useEffect } from "react";
import { useSnackbar } from "../../context/Snackbar";
import { useUser } from "../../context/User";
import { Navigate } from "react-router-dom";

export default function ProtactedRoute({ children }) {
  const { currentUser } = useUser();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!currentUser) {
      showSnackbar("Login to access Chat Page");
    }
  }, [currentUser, showSnackbar]);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  return children;
}
