import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import SoftwareCategoryTable from "../../components/ui/SoftwareCategory/SoftwareCategoryTable";
import SoftwareCategoryFormModal from "../../components/ui/SoftwareCategory/SoftwareFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function SoftwareCategoryManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("softwareCategories");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo keyword (tên nhóm hoặc mã nhóm)
  const filteredCategories = categories.filter((c) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [c.tenNhom, c.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const pagedData = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Ghi dữ liệu vào localStorage mỗi khi categories thay đổi
  useEffect(() => {
    localStorage.setItem("softwareCategories", JSON.stringify(categories));
  }, [categories]);

  // Thêm mới hoặc cập nhật
  const handleSave = (category) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === category.id
            ? {
                ...c,
                ...category,
                locked: category.kichHoat === false ? true : c.locked,
                updatedAt: new Date().toISOString(),
              }
            : c
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          ...category,
          id: Date.now(),
          locked: category.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingCategory(null);
    setCurrentPage(1); // Quay về trang đầu khi thêm mới
  };

  // Xóa
  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
    setShowConfirmModal(false);
    setSelectedCategory(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, locked: !c.locked } : c))
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
          DANH MỤC PHẦN MỀM
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
                  placeholder: "Tên phần mềm...",
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
                setEditingCategory(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <SoftwareCategoryTable
          data={pagedData}
          onEdit={(category) => {
            setEditingCategory(category);
            setShowFormModal(true);
          }}
          onDelete={(category) => {
            setSelectedCategory(category);
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
          totalItems={filteredCategories.length}
        />
      </div>
      <SoftwareCategoryFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingCategory={editingCategory}
      />
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm phần mềm này không?"
      />
      <Footer />
    </>
  );
}

export default SoftwareCategoryManagement;
