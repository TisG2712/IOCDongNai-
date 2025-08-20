import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function UsersFormModal({ open, onClose, onSave, editingUser }) {
  const [form, setForm] = useState({
    tenNguoiDung: "",
    email: "",
    dienThoai: "",
    maDonViHanhChinh: "",
    maDanToc: "",
    maPhongBan: "",
    maToChuc: "",
    thoiGianKhoa: "",
    nhomQuyen: [],
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        ...editingUser,
        thoiGianKhoa: editingUser.thoiGianKhoa
          ? new Date(editingUser.thoiGianKhoa).toISOString().slice(0, 16)
          : "",
      });
    } else {
      setForm({
        tenNguoiDung: "",
        email: "",
        dienThoai: "",
        maDonViHanhChinh: "",
        maDanToc: "",
        maPhongBan: "",
        maToChuc: "",
        thoiGianKhoa: "",
        nhomQuyen: [],
      });
    }
  }, [editingUser, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs">
      <div className="bg-white p-4 rounded shadow-lg min-w-[260px] max-w-[400px] w-full relative text-xs">
        {/* Icon đóng */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
          title="Đóng"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-base font-bold mb-3 text-center">
          {editingUser ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
        </h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...form,
              id: editingUser?.id || Date.now(),
              locked: editingUser?.locked || false,
              createdAt: editingUser?.createdAt || new Date().toISOString(),
              thoiGianKhoa: form.thoiGianKhoa
                ? new Date(form.thoiGianKhoa).toISOString()
                : null,
            });
          }}
        >
          <div>
            <label className="block mb-1 font-medium">Tên người dùng</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.tenNguoiDung}
              onChange={(e) =>
                setForm({ ...form, tenNguoiDung: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Điện thoại</label>
            <input
              type="tel"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.dienThoai}
              onChange={(e) => setForm({ ...form, dienThoai: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Mã đơn vị hành chính
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.maDonViHanhChinh}
              onChange={(e) =>
                setForm({ ...form, maDonViHanhChinh: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mã dân tộc</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.maDanToc}
              onChange={(e) => setForm({ ...form, maDanToc: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mã phòng ban</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.maPhongBan}
              onChange={(e) => setForm({ ...form, maPhongBan: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mã tổ chức - cơ sở</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.maToChuc}
              onChange={(e) => setForm({ ...form, maToChuc: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Thời gian khóa tài khoản
            </label>
            <input
              type="datetime-local"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.thoiGianKhoa}
              onChange={(e) =>
                setForm({ ...form, thoiGianKhoa: e.target.value })
              }
            />
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
              {editingUser ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersFormModal;
