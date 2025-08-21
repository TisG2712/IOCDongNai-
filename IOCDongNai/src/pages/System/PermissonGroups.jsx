import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import PermissionGroupsTable from "../../components/ui/PermissionGroups/PermissionGroupsTable";
import PermissionFormModal from "../../components/ui/PermissionGroups/PermissionFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function PermissonGroups() {
  const { isOpen } = useSidebar();
  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [permissionGroups, setPermissionGroups] = useState(() => {
    const saved = localStorage.getItem("permissionGroups");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGroups = permissionGroups.filter((g) => {
    const keyword = filters.keyword.trim().toLowerCase();
    const matchKeyword =
      keyword === "" || g.tenNhom.toLowerCase().includes(keyword);
    return matchKeyword;
  });

  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const pagedData = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi permissionGroups thay đổi
  useEffect(() => {
    localStorage.setItem("permissionGroups", JSON.stringify(permissionGroups));
  }, [permissionGroups]);

  // Thêm mới hoặc cập nhật
  const handleSave = (group) => {
    if (editingGroup) {
      setPermissionGroups((prev) =>
        prev.map((g) =>
          g.id === group.id
            ? {
                ...g,
                ...group,
                updatedAt: new Date().toISOString(),
              }
            : g
        )
      );
    } else {
      setPermissionGroups((prev) => [
        ...prev,
        {
          ...group,
          id: Date.now(),
          locked: false,
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
    setPermissionGroups((prev) =>
      prev.filter((g) => g.id !== selectedGroup.id)
    );
    setShowConfirmModal(false);
    setSelectedGroup(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (group) => {
    setPermissionGroups((prev) =>
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
          isOpen ? "sm:ml-64" : "ml-0"
        } transition-[margin] duration-300`}
      >
        <h2 className="text-md font-semibold text-red-700">
          DANH SÁCH NHÓM QUYỀN
        </h2>
      </div>
      <div
        className={`px-3 transition-[margin] duration-300 ${
          isOpen ? "sm:ml-64" : "ml-0"
        }`}
      >
        {/* Search + Add toolbar in one row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <Search
              fields={[
                {
                  name: "keyword",
                  label: "Nhóm quyền",
                  type: "text",
                  placeholder: "Tên nhóm quyền...",
                },
              ]}
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

        <PermissionGroupsTable
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
      <PermissionFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingGroup={editingGroup}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowFormModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm quyền này không?"
      />
      <Footer />
    </>
  );
}

export default PermissonGroups;
