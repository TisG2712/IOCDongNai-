import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import SoftwareFunctionGroupTable from "../../components/ui/SoftwareFunctionGroup/SoftwareFunctionGroupTable";
import SoftwareFunctionGroupFormModal from "../../components/ui/SoftwareFunctionGroup/SoftwareFunctionGroupFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal";
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function SoftwareFunctionGroupManagement() {
  const { isOpen } = useSidebar();

  // Đọc dữ liệu từ localStorage
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("softwareFunctionGroups");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Filter theo tên và mã nhóm
  const filteredGroups = groups.filter((g) => {
    const kw = keyword.trim().toLowerCase();
    return (
      kw === "" ||
      [g.tenNhom, g.maNhom]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(kw))
    );
  });

  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const pagedData = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("softwareFunctionGroups", JSON.stringify(groups));
  }, [groups]);

  // Thêm mới / cập nhật
  const handleSave = (group) => {
    if (editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === group.id
            ? {
                ...g,
                ...group,
                locked: group.kichHoat === false ? true : group.locked,
                updatedAt: new Date().toISOString(),
              }
            : g
        )
      );
    } else {
      setGroups((prev) => [
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
    setCurrentPage(1); // quay về trang đầu
  };

  // Xóa
  const handleDelete = () => {
    setGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
    setShowConfirmModal(false);
    setSelectedGroup(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (group) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === group.id ? { ...g, locked: !g.locked } : g))
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
          DANH SÁCH NHÓM CHỨC NĂNG PHẦN MỀM
        </h2>
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
                  label: "Tìm kiếm",
                  type: "text",
                  placeholder: "Tên nhóm / Mã nhóm...",
                },
              ]}
              values={{ keyword }}
              onChange={(name, value) => setKeyword(value)}
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

        <SoftwareFunctionGroupTable
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

      <SoftwareFunctionGroupFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingGroup={editingGroup}
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

export default SoftwareFunctionGroupManagement;
