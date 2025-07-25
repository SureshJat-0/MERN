import * as React from "react";
import FitbitIcon from "@mui/icons-material/Fitbit";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/User";
import MouseHoverPopover from "../MaterialComponent/MouseOverPopover";
import { useSnackbar } from "../../context/Snackbar";

export default function Navbar() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const { showSnackbar } = useSnackbar();

  const handleLogout = async (popupState) => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      popupState.close();
      navigate("/signin");
      setCurrentUser(null);
      console.log("User logout successfully!");
      showSnackbar("User Logout successfully!");
      return;
    } catch (err) {
      console.log("Logout Error!", err);
      showSnackbar("Logout Error!");
      navigate("/signin");
      popupState.close();
    }
  };
  return (
    <div className="w-[5vw] h-screen px-2 py-4 bg-[#f5f4f4] flex flex-col justify-between overflow-hidden">
      <div>
        <div className="mb-12 flex justify-center items-center">
          <FitbitIcon fontSize="large" />
        </div>

        <div className="flex flex-col items-center">
          <Link to="/" className="my-2">
            <MouseHoverPopover element={<ChatIcon />} popover={"Chat"} />
          </Link>
          <Link to="/signin" className="my-2">
            <MouseHoverPopover element={<LoginIcon />} popover={"Login"} />
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <PopupState variant="popover" popupId="setting-popup">
          {(popupState) => (
            <React.Fragment>
              <SettingsIcon
                {...bindTrigger(popupState)}
                className="cursor-pointer"
              />
              <Menu {...bindMenu(popupState)}>
                <Link to="/signin">
                  <MenuItem onClick={popupState.close}>
                    <LoginIcon className="mr-2" />
                    <span>Login</span>
                  </MenuItem>
                </Link>
                <MenuItem onClick={() => handleLogout(popupState)}>
                  <LogoutIcon className="mr-2" />
                  <span>Logout</span>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </div>
  );
}
