import React from "react";
import { Link } from "react-router-dom";
import Bground from "../../assets/images/background.png";
import NationalEmblem from "../../assets/images/government.png";
import UserAccountDropdown from "./UserAccountDropdown";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { username } = useAuth();

  return (
    <div id="app-header" className="relative w-full h-[64px] sm:h-[80px]">
      <img
        src={Bground}
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="relative flex items-center justify-between h-full px-3 sm:px-6 z-10">
        <div className="flex items-center min-w-0">
          <Link to="/dashboard" title="Về Dashboard" className="shrink-0">
            <img
              src={NationalEmblem}
              alt="National Emblem"
              className="w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] object-contain mr-3 sm:mr-4 cursor-pointer"
            />
          </Link>
          <div className="flex flex-col truncate">
            <h2 className="text-red-700 text-[18px] sm:text-[27px] font-semibold leading-tight truncate">
              HỆ THỐNG CHỈ ĐẠO ĐIỀU HÀNH
            </h2>
            <h3 className="text-blue-950 text-xs sm:text-md mt-0.5 sm:mt-1 font-semibold drop-shadow truncate">
              ỦY BAN NHÂN DÂN TỈNH ĐỒNG NAI
            </h3>
          </div>
        </div>

        {/* User Account Dropdown */}
        <div className="shrink-0">
          <UserAccountDropdown username={username} />
        </div>
      </div>
    </div>
  );
}

export default Header;
