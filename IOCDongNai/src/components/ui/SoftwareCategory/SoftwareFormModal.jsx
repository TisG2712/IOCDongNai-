import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function SoftwareFormModal({
  open,
  onClose,
  onSave,
  editingSoftware,
  categories,
}) {
  const [form, setForm] = useState({
    tenPhanMem: "",
    moTa: "",
    categoryId: "",
    tinhTrang: "active", // mặc định Kích hoạt
  });

  // Khi mở modal hoặc có editingSoftware thì load dữ liệu vào form
  useEffect(() => {
    if (editingSoftware) {
      setForm({
        tenPhanMem: editingSoftware.tenPhanMem || "",
        moTa: editingSoftware.moTa || "",
        categoryId: editingSoftware.categoryId || "",
        tinhTrang: editingSoftware.tinhTrang || "inactive",
      });
    } else {
      setForm({
        tenPhanMem: "",
        moTa: "",
        categoryId: "",
        tinhTrang: "active",
      });
    }
  }, [editingSoftware, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs">
      <div className="bg-white p-4 rounded shadow-lg min-w-[280px] max-w-[400px] w-full relative text-xs">
        {/* Icon đóng */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
          title="Đóng"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-base font-bold mb-3 text-center">
          {editingSoftware ? "Chỉnh sửa phần mềm" : "Thêm mới phần mềm"}
        </h2>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...form,
              id: editingSoftware?.id || Date.now(),
              locked: editingSoftware?.locked || false,
              createdAt: editingSoftware?.createdAt || new Date().toISOString(),
            });
            onClose();
          }}
        >
          {/* Tên phần mềm */}
          <div>
            <label className="block mb-1 font-medium">Tên phần mềm</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.tenPhanMem}
              onChange={(e) => setForm({ ...form, tenPhanMem: e.target.value })}
              required
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <textarea
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
              rows={3}
              value={form.moTa}
              onChange={(e) => setForm({ ...form, moTa: e.target.value })}
            />
          </div>

          {/* Tình trạng */}
          <div>
            <label className="block mb-1 font-medium">Kích hoạt</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="kichHoat"
                  checked={form.kichHoat === true}
                  onChange={() => setForm({ ...form, kichHoat: true })}
                />
                Kích hoạt
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="kichHoat"
                  checked={form.kichHoat === false}
                  onChange={() => setForm({ ...form, kichHoat: false })}
                />
                Chưa kích hoạt
              </label>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {editingSoftware ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SoftwareFormModal;
