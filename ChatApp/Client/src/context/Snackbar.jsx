import React, { createContext, useContext, useState, useCallback } from "react";
import SimpleSnackbar from "../Components/MaterialComponent/SimpleSnackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    message: "",
    visible: false,
  });

  const showSnackbar = useCallback((message) => {
    setSnack({ message, visible: true });
  }, []);

  const closeSnackbar = () => {
    setSnack((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SimpleSnackbar
        message={snack.message}
        show={snack.visible}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
