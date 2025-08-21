import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import OfficerTable from "../../components/ui/Officer/OfficerTable";
import OfficerFormModal from "../../components/ui/Officer/OfficerFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function OfficerManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [officers, setOfficers] = useState(() => {
    const saved = localStorage.getItem("officers");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  // Phân trang
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Bộ lọc tìm kiếm
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Lọc dữ liệu
  const filteredOfficers = officers.filter((o) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [o.tenNhom, o.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredOfficers.length / pageSize);
  const pagedData = filteredOfficers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu dữ liệu vào localStorage
  useEffect(() => {
    localStorage.setItem("officers", JSON.stringify(officers));
  }, [officers]);

  // Thêm mới hoặc cập nhật
  const handleSave = (officer) => {
    if (editingOfficer) {
      setOfficers((prev) =>
        prev.map((o) =>
          o.id === officer.id
            ? {
                ...o,
                ...officer,
                locked: officer.kichHoat === false ? true : o.locked,
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    } else {
      setOfficers((prev) => [
        ...prev,
        {
          ...officer,
          id: Date.now(),
          locked: officer.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingOfficer(null);
    setCurrentPage(1); // Quay về trang đầu
  };

  // Xóa
  const handleDelete = () => {
    setOfficers((prev) => prev.filter((o) => o.id !== selectedOfficer.id));
    setShowConfirmModal(false);
    setSelectedOfficer(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (officer) => {
    setOfficers((prev) =>
      prev.map((o) => (o.id === officer.id ? { ...o, locked: !o.locked } : o))
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
        <h2 className="text-md font-semibold text-red-700">DANH SÁCH CÁN BỘ</h2>
      </div>
      <div
        className={`px-3 transition-[margin] duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Search + Add */}
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
                setEditingOfficer(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <OfficerTable
          data={pagedData}
          onEdit={(officer) => {
            setEditingOfficer(officer);
            setShowFormModal(true);
          }}
          onDelete={(officer) => {
            setSelectedOfficer(officer);
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
          totalItems={filteredOfficers.length}
        />
      </div>
      <OfficerFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingOfficer={editingOfficer}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa officer này không?"
      />
      <Footer />
    </>
  );
}

export default OfficerManagement;
