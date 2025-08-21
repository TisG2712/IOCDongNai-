import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import NotificationGroupTable from "../../components/ui/NotificationGroup/NotificationGroupTable";
import NotificationGroupFormModal from "../../components/ui/NotificationGroup/NotificationGroupFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // có thể dùng lại
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function NotificationGroupManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [notificationGroups, setNotificationGroups] = useState(() => {
    const saved = localStorage.getItem("notificationGroups");
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
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo keyword (tenNhom hoặc maNhom)
  const filteredGroups = notificationGroups.filter((g) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [g.tenNhom, g.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const pagedData = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi notificationGroups thay đổi
  useEffect(() => {
    localStorage.setItem(
      "notificationGroups",
      JSON.stringify(notificationGroups)
    );
  }, [notificationGroups]);

  // Thêm mới hoặc cập nhật
  const handleSave = (group) => {
    if (editingGroup) {
      setNotificationGroups((prev) =>
        prev.map((g) =>
          g.id === group.id
            ? {
                ...g,
                ...group,
                locked: group.kichHoat === false ? true : g.locked,
                updatedAt: new Date().toISOString(),
              }
            : g
        )
      );
    } else {
      setNotificationGroups((prev) => [
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
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setNotificationGroups((prev) =>
      prev.filter((g) => g.id !== selectedGroup.id)
    );
    setShowConfirmModal(false);
    setSelectedGroup(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (group) => {
    setNotificationGroups((prev) =>
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
          DANH SÁCH NHÓM THÔNG BÁO
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
              fields={[
                {
                  name: "keyword",
                  label: "Từ khóa",
                  type: "text",
                  placeholder: "Tên nhóm / Mã nhóm...",
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

        <NotificationGroupTable
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
            setCurrentPage(1);
          }}
          totalItems={filteredGroups.length}
        />
      </div>

      <NotificationGroupFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingGroup={editingGroup}
      />

      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm thông báo này không?"
      />

      <Footer />
    </>
  );
}

export default NotificationGroupManagement;
