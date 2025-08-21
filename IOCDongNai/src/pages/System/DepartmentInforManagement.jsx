import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import DepartmentInforTable from "../../components/ui/DepartmentInfor/DepartmentInforTable";
import DepartmentFormModal from "../../components/ui/DepartmentInfor/DepartmentFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // có thể tái sử dụng
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function DepartmentInforManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Bộ lọc tìm kiếm (theo tên nhóm hoặc mã nhóm)
  const filteredDepartments = departments.filter((d) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [d.tenNhom, d.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredDepartments.length / pageSize);
  const pagedData = filteredDepartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi departments thay đổi
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  // Thêm mới hoặc cập nhật
  const handleSave = (department) => {
    if (editingDepartment) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === department.id
            ? {
                ...d,
                ...department,
                locked: department.kichHoat === false ? true : d.locked,
                updatedAt: new Date().toISOString(),
              }
            : d
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          ...department,
          id: Date.now(),
          locked: department.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingDepartment(null);
    setCurrentPage(1); // reset về trang đầu khi thêm mới
  };

  // Xóa
  const handleDelete = () => {
    setDepartments((prev) =>
      prev.filter((d) => d.id !== selectedDepartment.id)
    );
    setShowConfirmModal(false);
    setSelectedDepartment(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (department) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === department.id ? { ...d, locked: !d.locked } : d
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
          DANH SÁCH THÔNG TIN PHÒNG BAN
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
                  label: "Tìm kiếm",
                  type: "text",
                  placeholder: "Tên / Mã phòng ban...",
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
                setEditingDepartment(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <DepartmentInforTable
          data={pagedData}
          onEdit={(department) => {
            setEditingDepartment(department);
            setShowFormModal(true);
          }}
          onDelete={(department) => {
            setSelectedDepartment(department);
            setShowConfirmModal(true);
          }}
          onToggleLock={handleToggleLock}
        />

        {/* Pagination */}
        <PageNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          totalItems={filteredDepartments.length}
        />
      </div>

      {/* Modal thêm/sửa */}
      <DepartmentFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingDepartment={editingDepartment}
      />

      {/* Modal xác nhận */}
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa phòng ban này không?"
      />

      <Footer />
    </>
  );
}

export default DepartmentInforManagement;
