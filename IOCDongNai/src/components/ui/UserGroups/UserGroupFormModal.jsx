import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function UserGroupFormModal({ open, onClose, onSave, editingGroup }) {
  const [form, setForm] = useState({
    tenNhom: "",
    moTa: "",
    donViHanhChinh: "",
    nhomQuyen: [],
    kichHoat: true,
  });

  const [unitOptions, setUnitOptions] = useState([]);

  useEffect(() => {
    // Load danh sách đơn vị hành chính từ localStorage mỗi khi mở modal
    try {
      const raw = localStorage.getItem("unitCategories") || "[]";
      const list = JSON.parse(raw);
      const options = list
        .filter((item) => item && item.tenNhom)
        .map((item) => ({ value: item.tenNhom, label: item.tenNhom }));
      setUnitOptions(options);
    } catch (e) {
      setUnitOptions([]);
    }
  }, [open]);

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
        moTa: "",
        donViHanhChinh: "",
        nhomQuyen: [],
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
              Tên nhóm người dùng
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.tenNhom}
              onChange={(e) => setForm({ ...form, tenNhom: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Đơn vị hành chính</label>
            {unitOptions.length > 0 ? (
              <select
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                value={form.donViHanhChinh}
                onChange={(e) =>
                  setForm({ ...form, donViHanhChinh: e.target.value })
                }
              >
                <option value="">Chọn đơn vị hành chính</option>
                {unitOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={form.donViHanhChinh}
                onChange={(e) =>
                  setForm({ ...form, donViHanhChinh: e.target.value })
                }
                placeholder="Chưa có dữ liệu đơn vị hành chính"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Nhóm quyền</label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
              {(() => {
                const permissionGroups = JSON.parse(
                  localStorage.getItem("permissionGroups") || "[]"
                );
                return permissionGroups.length > 0 ? (
                  permissionGroups.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center gap-2 py-1"
                    >
                      <input
                        type="checkbox"
                        checked={form.nhomQuyen.includes(permission.tenNhom)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm({
                              ...form,
                              nhomQuyen: [
                                ...form.nhomQuyen,
                                permission.tenNhom,
                              ],
                            });
                          } else {
                            setForm({
                              ...form,
                              nhomQuyen: form.nhomQuyen.filter(
                                (name) => name !== permission.tenNhom
                              ),
                            });
                          }
                        }}
                      />
                      <span className="text-xs">{permission.tenNhom}</span>
                    </label>
                  ))
                ) : (
                  <div className="text-gray-500 text-xs">
                    Chưa có nhóm quyền nào
                  </div>
                );
              })()}
            </div>
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
          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.moTa}
              onChange={(e) => setForm({ ...form, moTa: e.target.value })}
            />
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

export default UserGroupFormModal;
