import React from "react";

function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-xs">
      <div className="bg-white p-4 rounded shadow-lg min-w-[220px] max-w-[400px] w-full text-xs">
        <div className="mb-4 text-center">{message}</div>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
