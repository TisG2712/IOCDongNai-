import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import OrganizationTypeTable from "../../components/ui/OrganizationType/OrganizationTypeTable";
import OrganizationFormModal from "../../components/ui/OrganizationType/OrganizationFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function OrganizationTypeManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [orgTypes, setOrgTypes] = useState(() => {
    const saved = localStorage.getItem("organizationTypes");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Phân trang
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Bộ lọc tìm kiếm
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Lọc theo từ khóa (tenNhom, maNhom)
  const filteredOrgs = orgTypes.filter((g) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [g.tenNhom, g.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredOrgs.length / pageSize);
  const pagedData = filteredOrgs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu dữ liệu xuống localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("organizationTypes", JSON.stringify(orgTypes));
  }, [orgTypes]);

  // Thêm mới hoặc cập nhật
  const handleSave = (org) => {
    if (editingOrg) {
      setOrgTypes((prev) =>
        prev.map((g) =>
          g.id === org.id
            ? {
                ...g,
                ...org,
                locked: org.kichHoat === false ? true : g.locked,
                updatedAt: new Date().toISOString(),
              }
            : g
        )
      );
    } else {
      setOrgTypes((prev) => [
        ...prev,
        {
          ...org,
          id: Date.now(),
          locked: org.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingOrg(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setOrgTypes((prev) => prev.filter((g) => g.id !== selectedOrg.id));
    setShowConfirmModal(false);
    setSelectedOrg(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (org) => {
    setOrgTypes((prev) =>
      prev.map((g) => (g.id === org.id ? { ...g, locked: !g.locked } : g))
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
          DANH SÁCH LOẠI HÌNH TỔ CHỨC
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
          <div className="flex-shrink-0">
            <button
              className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 h-[30px] mt-1.5"
              onClick={() => {
                setEditingOrg(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <OrganizationTypeTable
          data={pagedData}
          onEdit={(org) => {
            setEditingOrg(org);
            setShowFormModal(true);
          }}
          onDelete={(org) => {
            setSelectedOrg(org);
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
          totalItems={filteredOrgs.length}
        />
      </div>

      {/* Form Modal */}
      <OrganizationFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingOrg={editingOrg}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm tổ chức này không?"
      />

      <Footer />
    </>
  );
}

export default OrganizationTypeManagement;
