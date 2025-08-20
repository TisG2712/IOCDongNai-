import React from "react";
import { Link } from "react-router-dom";
import Bground from "../../assets/images/background.png";
import NationalEmblem from "../../assets/images/government.png";

function Header() {
  return (
    <div id="app-header" className="relative w-full h-[80px]">
      <img
        src={Bground}
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      {/* <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200" /> */}
      <div className="relative flex items-center h-full pl-6 z-10">
        <Link to="/dashboard" title="Về Dashboard">
          <img
            src={NationalEmblem}
            alt="National Emblem"
            className="w-[60px] h-[60px] object-contain mr-4 cursor-pointer"
          />
        </Link>
        <div className="flex flex-col">
          <h2 className="text-red-700 text-[27px] font-semibold leading-tight">
            HỆ THỐNG CHỈ ĐẠO ĐIỀU HÀNH
          </h2>
          <h3 className="text-blue-950 text-md mt-1 text-center font-semibold drop-shadow">
            ỦY BAN NHÂN DÂN TỈNH ĐỒNG NAI
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
