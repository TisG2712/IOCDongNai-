import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function SoftwareFunctionGroupFormModal({
  open,
  onClose,
  onSave,
  editingGroup,
}) {
  const [form, setForm] = useState({
    tenNhom: "",
    maNhom: "",
    moTa: "",
    kichHoat: true,
  });

  useEffect(() => {
    if (editingGroup)
      setForm({
        ...editingGroup,
        kichHoat:
          editingGroup.kichHoat !== undefined ? editingGroup.kichHoat : true,
      });
    else
      setForm({
        tenNhom: "",
        maNhom: "",
        moTa: "",
        kichHoat: true,
      });
  }, [editingGroup, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs">
      <div className="bg-white p-4 rounded shadow-lg min-w-[260px] max-w-[340px] w-full relative text-xs">
        {/* Icon đóng */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
          title="Đóng"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-base font-bold mb-3 text-center">
          {editingGroup ? "Chỉnh sửa" : "Thêm mới"}
        </h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...form,
              id: editingGroup?.id || Date.now(),
              locked:
                form.kichHoat === false ? true : editingGroup?.locked || false,
            });
          }}
        >
          <div>
            <label className="block mb-1 font-medium">
              Tên nhóm chức năng phần mềm
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.tenNhom}
              onChange={(e) => setForm({ ...form, tenNhom: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.moTa}
              onChange={(e) => setForm({ ...form, moTa: e.target.value })}
            />
          </div>
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
              {editingGroup ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SoftwareFunctionGroupFormModal;
