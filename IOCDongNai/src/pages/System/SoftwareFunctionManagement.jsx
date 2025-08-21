import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import SoftwareFunctionTable from "../../components/ui/SoftwareFunction/SoftwareFunctionTable";
import SoftwareFunctionFormModal from "../../components/ui/SoftwareFunction/SoftwareFunctionFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // Dùng chung ConfirmModal
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function SoftwareFunctionManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [functions, setFunctions] = useState(() => {
    const saved = localStorage.getItem("softwareFunctions");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter dữ liệu theo tên và mã
  const filteredFunctions = functions.filter((f) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [f.tenNhom, f.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(keyword))
    );
  });

  const totalPages = Math.ceil(filteredFunctions.length / pageSize);
  const pagedData = filteredFunctions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("softwareFunctions", JSON.stringify(functions));
  }, [functions]);

  // Thêm mới / cập nhật
  const handleSave = (func) => {
    if (editingFunction) {
      setFunctions((prev) =>
        prev.map((f) =>
          f.id === func.id
            ? {
                ...f,
                ...func,
                locked: func.kichHoat === false ? true : f.locked,
                updatedAt: new Date().toISOString(),
              }
            : f
        )
      );
    } else {
      setFunctions((prev) => [
        ...prev,
        {
          ...func,
          id: Date.now(),
          locked: func.kichHoat === false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setShowFormModal(false);
    setEditingFunction(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setFunctions((prev) => prev.filter((f) => f.id !== selectedFunction.id));
    setShowConfirmModal(false);
    setSelectedFunction(null);
  };

  // Khóa / mở khóa
  const handleToggleLock = (func) => {
    setFunctions((prev) =>
      prev.map((f) => (f.id === func.id ? { ...f, locked: !f.locked } : f))
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
          DANH SÁCH CHỨC NĂNG PHẦN MỀM
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
                setEditingFunction(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <SoftwareFunctionTable
          data={pagedData}
          onEdit={(func) => {
            setEditingFunction(func);
            setShowFormModal(true);
          }}
          onDelete={(func) => {
            setSelectedFunction(func);
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
          totalItems={filteredFunctions.length}
        />
      </div>

      <SoftwareFunctionFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingFunction={editingFunction}
      />

      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa nhóm chức năng này không?"
      />

      <Footer />
    </>
  );
}

export default SoftwareFunctionManagement;
