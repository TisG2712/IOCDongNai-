import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import AccessLogTable from "../../components/ui/AccessLog/AccessLogTable";
import AccessLogFormModal from "../../components/ui/AccessLog/AccessLogFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // Dùng chung
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function AccessLogManagement() {
  const { isOpen } = useSidebar();

  const [accessLogs, setAccessLogs] = useState(() => {
    const saved = localStorage.getItem("accessLogs");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({ keyword: "" });
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo keyword (tenNhom hoặc maNhom)
  const filteredLogs = accessLogs.filter((log) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [log.tenNhom, log.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const pagedData = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi accessLogs thay đổi
  useEffect(() => {
    localStorage.setItem("accessLogs", JSON.stringify(accessLogs));
  }, [accessLogs]);

  // Thêm mới hoặc cập nhật
  const handleSave = (log) => {
    if (editingLog) {
      setAccessLogs((prev) =>
        prev.map((l) =>
          l.id === log.id
            ? { ...l, ...log, updatedAt: new Date().toISOString() }
            : l
        )
      );
    } else {
      setAccessLogs((prev) => [
        ...prev,
        { ...log, id: Date.now(), createdAt: new Date().toISOString() },
      ]);
    }
    setShowFormModal(false);
    setEditingLog(null);
    setCurrentPage(1); // Quay về trang đầu khi thêm mới
  };

  // Xóa
  const handleDelete = () => {
    setAccessLogs((prev) => prev.filter((l) => l.id !== selectedLog.id));
    setShowConfirmModal(false);
    setSelectedLog(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (log) => {
    setAccessLogs((prev) =>
      prev.map((l) => (l.id === log.id ? { ...l, locked: !l.locked } : l))
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
          DANH SÁCH QUẢN LÝ LOG TRUY CẬP
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
                setEditingLog(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <AccessLogTable
          data={pagedData}
          onEdit={(log) => {
            setEditingLog(log);
            setShowFormModal(true);
          }}
          onDelete={(log) => {
            setSelectedLog(log);
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
          totalItems={filteredLogs.length}
        />
      </div>

      <AccessLogFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingLog={editingLog}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa Access Log này không?"
      />
      <Footer />
    </>
  );
}

export default AccessLogManagement;
