import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import SystemParameterTable from "../../components/ui/SystemParameter/SystemParameterTable";
import SystemParameterFormModal from "../../components/ui/SystemParameter/SystemParameterFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // có thể dùng lại ConfirmModal
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function SystemParameterManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [systemParameters, setSystemParameters] = useState(() => {
    const saved = localStorage.getItem("systemParameters");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingParameter, setEditingParameter] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const filteredParameters = systemParameters.filter((p) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [p.tenNhom, p.maNhom].some((v) =>
        (v || "").toLowerCase().includes(keyword)
      )
    );
  });

  const totalPages = Math.ceil(filteredParameters.length / pageSize);
  const pagedData = filteredParameters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi systemParameters thay đổi
  useEffect(() => {
    localStorage.setItem("systemParameters", JSON.stringify(systemParameters));
  }, [systemParameters]);

  // Thêm mới hoặc cập nhật
  const handleSave = (param) => {
    if (editingParameter) {
      setSystemParameters((prev) =>
        prev.map((p) =>
          p.id === param.id
            ? {
                ...p,
                ...param,
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    } else {
      setSystemParameters((prev) => [
        ...prev,
        {
          ...param,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingParameter(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setSystemParameters((prev) =>
      prev.filter((p) => p.id !== selectedParameter.id)
    );
    setShowConfirmModal(false);
    setSelectedParameter(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (param) => {
    setSystemParameters((prev) =>
      prev.map((p) => (p.id === param.id ? { ...p, locked: !p.locked } : p))
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      <div
        className={`px-4 py-2 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-[margin] duration-300`}
      >
        <h2 className="text-md font-semibold text-red-700">
          DANH SÁCH THAM SỐ HỆ THỐNG
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
                setEditingParameter(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <SystemParameterTable
          data={pagedData}
          onEdit={(param) => {
            setEditingParameter(param);
            setShowFormModal(true);
          }}
          onDelete={(param) => {
            setSelectedParameter(param);
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
          totalItems={filteredParameters.length}
        />
      </div>

      <SystemParameterFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingParameter={editingParameter}
      />

      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa cấu hình hệ thống này không?"
      />

      <Footer />
    </>
  );
}

export default SystemParameterManagement;
