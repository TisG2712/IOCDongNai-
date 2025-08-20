import React, { useRef } from "react";
import {
  FaHome,
  FaUsersCog,
  FaEye,
  FaLightbulb,
  FaComments,
  FaExclamationCircle,
  FaChartBar,
  FaTable,
} from "react-icons/fa";
import { useSidebar } from "./SidebarContext";

const menuItems = [
  { name: "Trang chủ", icon: <FaHome /> },
  {
    name: "Quản trị hệ thống",
    icon: <FaUsersCog />,
    dropdown: [
      "Quản lý nhóm người dùng",
      "Quản lý người dùng",
      "Quản lý danh mục phần mềm",
      "Quản lý danh mục Loại hình tổ chức",
      "Quản lý Nhóm quyền",
      "Quản lý Mật khẩu và Bảo Mật",
      "Quản lý Log truy cập",
      "Thống kê truy cập",
      "Quản lý danh mục Phòng Ban",
      "Quản lý thông tin Phòng Ban",
      "Quản lý danh mục hành chính",
      "Quản lý danh mục dân tộc",
      "Quản lý Cán Bộ",
      "Quản lý Nhóm Tham số hệ thống",
      "Quản lý tham số hệ thống",
      "Quản lý Nhóm chức năng phần mềm",
      "Quản lý chức năng phần mềm",
      "Quản lý Nhóm Thông báo",
      "Quản lý Thông báo",
      "Tích hợp & API",
    ],
  },
  { name: "Giám sát", icon: <FaEye />, dropdown: ["Quản lý giám sát"] },
  {
    name: "Đưa ra quyết định",
    icon: <FaLightbulb />,
    dropdown: ["Quản lý giám sát"],
  },
  {
    name: "Tương tác - giao tiếp",
    icon: <FaComments />,
    dropdown: ["Quản lý giám sát"],
  },
  {
    name: "Quản lý sự cố",
    icon: <FaExclamationCircle />,
    dropdown: ["Quản lý giám sát"],
  },
  {
    name: "Báo cáo thống kê",
    icon: <FaChartBar />,
    dropdown: ["Quản lý giám sát"],
  },
  {
    name: "Phân tích dữ liệu",
    icon: <FaTable />,
    dropdown: ["Quản lý giám sát"],
  },
];

function Navbar() {
  const navRef = useRef();
  const { openSidebar } = useSidebar();

  return (
    <nav id="app-navbar" className="bg-red-700" ref={navRef}>
      <div className="max-w-8xl ml-3">
        <div className="flex h-[36px] items-center space-x-4 text-xs">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => {
                  if (item.dropdown) {
                    const sidebarItems = item.dropdown.map((label) => {
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý nhóm người dùng"
                      ) {
                        return { label, to: "/user-group-management" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý người dùng"
                      ) {
                        return { label, to: "/user-management" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm quyền"
                      ) {
                        return { label, to: "/permission-groups" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý danh mục phần mềm"
                      ) {
                        return { label, to: "/software-category" };
                      }
                      return { label };
                    });
                    openSidebar({ title: item.name, items: sidebarItems });
                  } else {
                    if (item.name === "Trang chủ") {
                      openSidebar({
                        title: item.name,
                        items: [{ label: "Dashboard", to: "/dashboard" }],
                      });
                    } else {
                      openSidebar({ title: item.name, items: [] });
                    }
                  }
                }}
                className="text-white max-h-full px-2 py-2.5 hover:bg-red-600 transition flex items-center"
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
