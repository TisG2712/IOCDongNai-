import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import PasswordPoliciesTable from "../../components/ui/PasswordPolicies/PasswordPoliciesTable";
import PasswordPoliciesFormModal from "../../components/ui/PasswordPolicies/PasswordPoliciesFormModal";
import ConfirmModal from "../../components/ui/UserGroups/ConfirmModal"; // dùng chung modal confirm
import PageNavigation from "../../components/ui/PageNavigation";
import Search from "../../components/ui/Search";
import { FaPlus } from "react-icons/fa";
import { useSidebar } from "../../components/ui/SidebarContext";

function PasswordPoliciesManagement() {
  const { isOpen } = useSidebar();

  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem("passwordPolicies");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({ keyword: "" });
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo tên hoặc mã nhóm
  const filteredPolicies = policies.filter((p) => {
    const keyword = filters.keyword.trim().toLowerCase();
    return (
      keyword === "" ||
      [p.tenNhom, p.maNhom].some((v) =>
        (v || "").toLowerCase().includes(keyword)
      )
    );
  });

  const totalPages = Math.ceil(filteredPolicies.length / pageSize);
  const pagedData = filteredPolicies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Lưu localStorage
  useEffect(() => {
    localStorage.setItem("passwordPolicies", JSON.stringify(policies));
  }, [policies]);

  // Thêm mới hoặc cập nhật
  const handleSave = (policy) => {
    if (editingPolicy) {
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === policy.id
            ? { ...p, ...policy, updatedAt: new Date().toISOString() }
            : p
        )
      );
    } else {
      setPolicies((prev) => [
        ...prev,
        { ...policy, id: Date.now(), createdAt: new Date().toISOString() },
      ]);
    }
    setShowFormModal(false);
    setEditingPolicy(null);
    setCurrentPage(1);
  };

  // Xóa
  const handleDelete = () => {
    setPolicies((prev) => prev.filter((p) => p.id !== selectedPolicy.id));
    setShowConfirmModal(false);
    setSelectedPolicy(null);
  };

  // Khóa/Mở khóa
  const handleToggleLock = (policy) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === policy.id ? { ...p, locked: !p.locked } : p))
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
          MẬT KHẨU VÀ BẢO MẬT
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
                  placeholder: "Tên điều khoản",
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
                setEditingPolicy(null);
                setShowFormModal(true);
              }}
            >
              <FaPlus className="text-sm" />
              Thêm mới
            </button>
          </div>
        </div>

        <PasswordPoliciesTable
          data={pagedData}
          onEdit={(policy) => {
            setEditingPolicy(policy);
            setShowFormModal(true);
          }}
          onDelete={(policy) => {
            setSelectedPolicy(policy);
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
          totalItems={filteredPolicies.length}
        />
      </div>

      <PasswordPoliciesFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        editingPolicy={editingPolicy}
      />

      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Bạn có chắc chắn muốn xóa chính sách mật khẩu này không?"
      />

      <Footer />
    </>
  );
}

export default PasswordPoliciesManagement;
