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
      "Quản lý Nhóm người dùng",
      "Quản lý Người dùng",
      "Quản lý Danh mục phần mềm",
      "Quản lý Danh mục Loại hình tổ chức",
      "Quản lý Nhóm quyền",
      "Quản lý Mật khẩu và Bảo Mật",
      "Quản lý Log truy cập",
      "Thống kê Truy cập",
      "Quản lý Danh mục Phòng Ban",
      "Quản lý Thông tin Phòng Ban",
      "Quản lý Danh mục Hành chính",
      "Quản lý Danh mục Dân tộc",
      "Quản lý Nhóm Cán bộ",
      "Quản lý Cán Bộ",
      "Quản lý Nhóm Tham số hệ thống",
      "Quản lý Tham số hệ thống",
      "Quản lý Nhóm chức năng phần mềm",
      "Quản lý Chức năng phần mềm",
      "Quản lý Nhóm Thông báo",
      "Quản lý Thông báo",
      "Tích hợp & API",
    ],
  },
  { name: "Giám sát", icon: <FaEye />, dropdown: ["Quản lý"] },
  {
    name: "Đưa ra quyết định",
    icon: <FaLightbulb />,
    dropdown: ["Quản lý"],
  },
  {
    name: "Tương tác - giao tiếp",
    icon: <FaComments />,
    dropdown: ["Quản lý "],
  },
  {
    name: "Quản lý sự cố",
    icon: <FaExclamationCircle />,
    dropdown: ["Quản lý"],
  },
  {
    name: "Báo cáo thống kê",
    icon: <FaChartBar />,
    dropdown: ["Quản lý"],
  },
  {
    name: "Phân tích dữ liệu",
    icon: <FaTable />,
    dropdown: ["Quản lý"],
  },
];

function Navbar() {
  const navRef = useRef();
  const { openSidebar } = useSidebar();

  return (
    <nav id="app-navbar" className="bg-red-700" ref={navRef}>
      <div className="max-w-8xl ml-0 sm:ml-3">
        <div className="flex flex-wrap gap-x-1 gap-y-1 sm:gap-y-0 h-auto sm:h-[36px] items-center text-xs px-2 sm:px-0 py-1 sm:py-0">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => {
                  if (item.dropdown) {
                    const sidebarItems = item.dropdown.map((label) => {
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm người dùng"
                      ) {
                        return { label, to: "/user-group-management" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Người dùng"
                      ) {
                        return { label, to: "/user-management" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Danh mục phần mềm"
                      ) {
                        return { label, to: "/software-category" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Danh mục Loại hình tổ chức"
                      ) {
                        return { label, to: "/organization-types-category" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm quyền"
                      ) {
                        return { label, to: "/permission-groups" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Mật khẩu và Bảo Mật"
                      ) {
                        return { label, to: "/password-policies" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Log truy cập"
                      ) {
                        return { label, to: "/access-log" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Thống kê Truy cập"
                      ) {
                        return { label, to: "/access-log-dashboard" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Danh mục Phòng Ban"
                      ) {
                        return { label, to: "/department-category" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Thông tin Phòng Ban"
                      ) {
                        return { label, to: "/department-information" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Danh mục Hành chính"
                      ) {
                        return { label, to: "/unit-category" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Danh mục Dân tộc"
                      ) {
                        return { label, to: "/ethnic-category" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm Cán bộ"
                      ) {
                        return { label, to: "/officer-group" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Cán Bộ"
                      ) {
                        return { label, to: "/officer" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm Tham số hệ thống"
                      ) {
                        return { label, to: "/system-parameter-group" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Tham số hệ thống"
                      ) {
                        return { label, to: "/system-parameter" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm chức năng phần mềm"
                      ) {
                        return { label, to: "/software-function-group" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Chức năng phần mềm"
                      ) {
                        return { label, to: "/software-function" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Nhóm Thông báo"
                      ) {
                        return { label, to: "/notification-group" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Quản lý Thông báo"
                      ) {
                        return { label, to: "/notification" };
                      }
                      if (
                        item.name === "Quản trị hệ thống" &&
                        label === "Tích hợp & API"
                      ) {
                        return { label, to: "/itegration-and-api" };
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
                className="text-white px-2 py-2.5 hover:bg-red-600 transition flex items-center rounded"
              >
                <span className="mr-2">{item.icon}</span>
                <span className="whitespace-nowrap">{item.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
