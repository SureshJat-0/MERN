import * as React from "react";
import FitbitIcon from "@mui/icons-material/Fitbit";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/User";

export default function Navbar() {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async (popupState) => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      popupState.close();
      navigate("/");
      console.log("User logout successfuly!");
      return alert("User logout!");
    } catch (err) {
      console.log("Logout Error!", err);
      alert("Logout Error!");
      popupState.close();
    }
  };
  return (
    <div className="w-[5vw] h-screen px-2 py-4 bg-[#f5f4f4] flex flex-col justify-between">
      <div>
        <div className="mb-10 flex justify-center items-center">
          <FitbitIcon fontSize="large" />
        </div>
        <div className="flex flex-col items-center">
          <Link to="/">
            <HomeIcon fontSize="large" className="cursor-pointer m-1" />
          </Link>
          <Link to="/chat">
            <ChatIcon className="cursor-pointer m-1" />
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <PopupState variant="popover" popupId="setting-popup">
          {(popupState) => (
            <React.Fragment>
              <SettingsIcon {...bindTrigger(popupState)} />
              <Menu {...bindMenu(popupState)}>
                <Link to="/">
                  <MenuItem onClick={popupState.close}>Login</MenuItem>
                </Link>
                <MenuItem onClick={() => handleLogout(popupState)}>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </div>
  );
}
