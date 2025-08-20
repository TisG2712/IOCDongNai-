import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import UserGroupsTable from "../../components/ui/UserGroups/UserGroupsTable";
import UserGroupFormModal from "../../components/ui/UserGroups/UserGroupFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function UserGroupManagement() {
  const { isOpen } = useSidebar();
  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [userGroups, setUserGroups] = useState(() => {
    const saved = localStorage.getItem("userGroups");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
    donViHanhChinh: "",
    nhomQuyen: "",
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGroups = userGroups.filter((g) => {
    const keyword = filters.keyword.trim().toLowerCase();
    const matchKeyword =
      keyword === "" ||
      [g.tenNhom, g.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword));
    const matchDonVi =
      !filters.donViHanhChinh || g.donViHanhChinh === filters.donViHanhChinh;
    const matchNhomQuyen =
      !filters.nhomQuyen ||
      (Array.isArray(g.nhomQuyen)
        ? g.nhomQuyen.includes(filters.nhomQuyen)
        : g.nhomQuyen === filters.nhomQuyen);
    return matchKeyword && matchDonVi && matchNhomQuyen;
  });

  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const pagedData = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi userGroups thay đổi
  useEffect(() => {
    localStorage.setItem("userGroups", JSON.stringify(userGroups));
  }, [userGroups]);

  // Thêm mới hoặc cập nhật
  const handleSave = (group) => {
    if (editingGroup) {
      setUserGroups((prev) =>
        prev.map((g) =>
          g.id === group.id
            ? {
                ...g,
                ...group,
                locked: group.kichHoat === false ? true : group.locked,
                updatedAt: new Date().toISOString(),
              }
            : g
        )
      );
    } else {
      setUserGroups((prev) => [
        ...prev,
        {
          ...group,
          id: Date.now(),
          locked: group.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingGroup(null);
    setCurrentPage(1); // Quay về trang đầu khi thêm mới
  };

  // Xóa
  const handleDelete = () => {
    setUserGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
    setShowConfirmModal(false);
    setSelectedGroup(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (group) => {
    setUserGroups((prev) =>
      prev.map((g) => (g.id === group.id ? { ...g, locked: !g.locked } : g))
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      {/* Page Title */}
      <div
        className={`px-4 py-2 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-[margin] duration-300`}
      >
        <h2 className="text-md font-semibold text-red-700">
          DANH SÁCH NHÓM NGƯỜI DÙNG
        </h2>
      </div>
      <div
        className={`px-3 transition-[margin] duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Search + Add toolbar in one row */}
        <div className="flex items-start gap-2 mb-2">
          <div className="flex-1">
            <Search
              fields={(() => {
                const donVis = Array.from(
                  new Set(
                    userGroups
                      .map((g) => g.donViHanhChinh)
                      .filter((v) => v && v.trim() !== "")
                  )
                );
                const nhomQuyens = Array.from(
                  new Set(
                    userGroups
                      .flatMap((g) =>
                        Array.isArray(g.nhomQuyen) ? g.nhomQuyen : [g.nhomQuyen]
                      )
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
                    placeholder: "Tên nhóm / Mã nhóm...",
                  },
                  {
                    name: "nhomQuyen",
                    label: "Nhóm quyền",
                    type: "select",
                    options: [
                      { value: "", label: "Chọn nhóm quyền" },
                      ...nhomQuyens.map((v) => ({ value: v, label: v })),
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
                setEditingGroup(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <UserGroupsTable
          data={pagedData}
          onEdit={(group) => {
            setEditingGroup(group);
            setShowFormModal(true);
          }}
          onDelete={(group) => {
            setSelectedGroup(group);
            setShowConfirmModal(true);
          }}
          onToggleLock={handleToggleLock}
        />
        <PageNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1); // reset về trang đầu khi đổi pageSize
          }}
          totalItems={filteredGroups.length}
        />
      </div>
      <UserGroupFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingGroup={editingGroup}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm người dùng này không?"
      />
      <Footer />
    </>
  );
}

export default UserGroupManagement;
