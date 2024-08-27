import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import camerIcon from "../assets/images/camera-icon.svg";
import uploadIcon from "../assets/images/upload-icon.svg";
import logoutIcon from "../assets/images/logout-icon.svg";

type Props = {
  openModal: () => void;
};

const Navbar = ({ openModal }: Props) => {
  const navigate = useNavigate();
  async function logout() {
    await signOut();
    navigate("/auth");
  }
  return (
    <div className="flex items-center justify-center relative">
      <div className="navbar bg-accent py-0 rounded-full max-w-[400px] fixed top-1 z-10 flex items-center justify-center">
        <div className="flex flex-1 items-center gap-x-2">
          <img src={camerIcon} alt="camera" />
          <h2 className="text-2xl font-medium pb-1">PhotoPie</h2>
        </div>

        <ul className="menu menu-horizontal bg-accent rounded-box">
          <li onClick={openModal}>
            <a className="tooltip tooltip-bottom" data-tip="Upload">
              <img src={uploadIcon} alt="upload" />
            </a>
          </li>
          <li onClick={logout}>
            <a className="tooltip tooltip-bottom" data-tip="Logout">
              <img src={logoutIcon} alt="logout" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
