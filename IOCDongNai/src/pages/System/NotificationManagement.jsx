import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import NotificationTable from "../../components/ui/Notification/NotificationTable";
import NotificationFormModal from "../../components/ui/Notification/NotificationFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // reuse ConfirmModal
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function NotificationManagement() {
  const { isOpen } = useSidebar();

  // Load dữ liệu từ localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({ keyword: "" });

  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo tên nhóm và mã nhóm
  const filteredNotifications = notifications.filter((n) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [n.tenNhom, n.maNhom].some((v) =>
        (v || "").toLowerCase().includes(keyword)
      )
    );
  });

  const totalPages = Math.ceil(filteredNotifications.length / pageSize);
  const pagedData = filteredNotifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu vào localStorage khi notifications thay đổi
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Thêm mới hoặc cập nhật
  const handleSave = (notification) => {
    if (editingNotification) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id
            ? {
                ...n,
                ...notification,
                locked: notification.kichHoat === false ? true : n.locked,
                updatedAt: new Date().toISOString(),
              }
            : n
        )
      );
    } else {
      setNotifications((prev) => [
        ...prev,
        {
          ...notification,
          id: Date.now(),
          locked: notification.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingNotification(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== selectedNotification.id)
    );
    setShowConfirmModal(false);
    setSelectedNotification(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (notification) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, locked: !n.locked } : n
      )
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
          DANH SÁCH THÔNG BÁO
        </h2>
      </div>
      <div
        className={`px-3 transition-[margin] duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Search + Add toolbar */}
        <div className="flex items-start gap-2 mb-2">
          <div className="flex-1">
            <Search
              fields={[
                {
                  name: "keyword",
                  label: "Từ khóa",
                  type: "text",
                  placeholder: "Tên kiếm thông báo...",
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
                setEditingNotification(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <NotificationTable
          data={pagedData}
          onEdit={(notification) => {
            setEditingNotification(notification);
            setShowFormModal(true);
          }}
          onDelete={(notification) => {
            setSelectedNotification(notification);
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
          totalItems={filteredNotifications.length}
        />
      </div>

      <NotificationFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingNotification={editingNotification}
      />

      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa thông báo này không?"
      />

      <Footer />
    </>
  );
}

export default NotificationManagement;
