import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";

export default function SimpleSnackbar({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed left-8 bottom-8 min-w-70 min-h-12 px-6 py-2 rounded flex justify-between items-center text-lg shadow-lg bg-[#494949] text-white">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="border-0 text-white font-lg ml-4 cursor-pointer"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
