import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function AccessLogFormModal({ open, onClose, onSave, editingLog }) {
  const [form, setForm] = useState({
    moTa: "",
    mucDoQuanTrong: "",
    trangThaiTruyCap: "",
    thoiGianTruyCap: "",
    diaChiIP: "",
  });

  useEffect(() => {
    if (editingLog) {
      setForm({
        ...editingLog,
      });
    } else {
      setForm({
        moTa: "",
        mucDoQuanTrong: "",
        trangThaiTruyCap: "",
        thoiGianTruyCap: "",
        diaChiIP: "",
      });
    }
  }, [editingLog, open]);

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
          {editingLog ? "Chỉnh sửa" : "Thêm mới"}
        </h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...form,
              id: editingLog?.id || Date.now(),
            });
          }}
        >
          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.moTa}
              onChange={(e) => setForm({ ...form, moTa: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mức độ quan trọng</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.mucDoQuanTrong}
              onChange={(e) =>
                setForm({ ...form, mucDoQuanTrong: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Trạng thái truy cập
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="trangThaiTruyCap"
                  value="Thành công"
                  checked={form.trangThaiTruyCap === "Thành công"}
                  onChange={(e) =>
                    setForm({ ...form, trangThaiTruyCap: e.target.value })
                  }
                />
                Thành công
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="trangThaiTruyCap"
                  value="Thất bại"
                  checked={form.trangThaiTruyCap === "Thất bại"}
                  onChange={(e) =>
                    setForm({ ...form, trangThaiTruyCap: e.target.value })
                  }
                />
                Thất bại
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Thời gian truy cập</label>
            <input
              type="datetime-local"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.thoiGianTruyCap}
              onChange={(e) =>
                setForm({ ...form, thoiGianTruyCap: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Địa chỉ IP</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={form.diaChiIP}
              onChange={(e) => setForm({ ...form, diaChiIP: e.target.value })}
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
              {editingLog ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccessLogFormModal;
