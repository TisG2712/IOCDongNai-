// src/pages/Users/UsersManagement.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import UsersTable from "../../components/ui/User/UsersTable";
import UsersFormModal from "../../components/ui/User/UsersFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function UserManagement() {
  const { isOpen } = useSidebar();

  // Load dữ liệu từ localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
    donViHanhChinh: "",
    nhomNguoiDung: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Bộ lọc
  const filteredUsers = users.filter((u) => {
    const keyword = filters.keyword.trim().toLowerCase();
    const matchKeyword =
      keyword === "" ||
      [u.tenNguoiDung, u.tenDangNhap]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword));
    const matchDonVi =
      !filters.donViHanhChinh || u.donViHanhChinh === filters.donViHanhChinh;
    const matchNhom =
      !filters.nhomNguoiDung || u.nhomNguoiDung === filters.nhomNguoiDung;
    return matchKeyword && matchDonVi && matchNhom;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const pagedData = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu vào localStorage khi users thay đổi
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Thêm mới / cập nhật
  const handleSave = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, ...user, updatedAt: new Date().toISOString() }
            : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          ...user,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingUser(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Header />
      <Navbar />
      {/* Page Title */}
      <div
        className={`px-4 py-2 ${
          isOpen ? "sm:ml-64" : "ml-0"
        } transition-[margin] duration-300`}
      >
        <h2 className="text-md font-semibold text-red-700">
          DANH SÁCH NGƯỜI DÙNG
        </h2>
      </div>
      <div
        className={`px-3 transition-[margin] duration-300 ${
          isOpen ? "sm:ml-64" : "ml-0"
        }`}
      >
        {/* Search + Add toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <Search
              fields={(() => {
                const donVis = Array.from(
                  new Set(
                    users
                      .map((u) => u.donViHanhChinh)
                      .filter((v) => v && v.trim() !== "")
                  )
                );
                const nhoms = Array.from(
                  new Set(
                    users
                      .map((u) => u.nhomNguoiDung)
                      .filter((v) => v && v.trim() !== "")
                  )
                );
                return [
                  {
                    name: "donViHanhChinh",
                    label: "Đơn vị",
                    type: "select",
                    options: [
                      { value: "", label: "Chọn đơn vị" },
                      ...donVis.map((v) => ({ value: v, label: v })),
                    ],
                  },
                  {
                    name: "keyword",
                    label: "Từ khóa",
                    type: "text",
                    placeholder: "Tên người dùng / Tên đăng nhập...",
                  },
                  {
                    name: "nhomNguoiDung",
                    label: "Nhóm người dùng",
                    type: "select",
                    options: [
                      { value: "", label: "Chọn nhóm" },
                      ...nhoms.map((v) => ({ value: v, label: v })),
                    ],
                  },
                ];
              })()}
              values={filters}
              onChange={(name, value) =>
                setFilters((prev) => ({ ...prev, [name]: value }))
              }
              onSearch={() => setCurrentPage(1)}
            />
          </div>
          <div className="flex-shrink-1">
            <button
              className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 h-[30px] mt-1.5"
              onClick={() => {
                setEditingUser(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <UsersTable
          data={pagedData}
          onEdit={(user) => {
            setEditingUser(user);
            setShowFormModal(true);
          }}
          onDelete={(user) => {
            setSelectedUser(user);
            setShowConfirmModal(true);
          }}
        />
        <PageNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          totalItems={filteredUsers.length}
        />
      </div>
      <UsersFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingUser={editingUser}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa người dùng này không?"
      />
      <Footer />
    </>
  );
}

export default UserManagement;
