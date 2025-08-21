import React from "react";
import {
  FaEdit,
  FaTrash,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Hàm lấy ngày giờ định dạng đẹp
function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )} - ` +
    `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
  );
}

function OrganizationTypeTable({ data, onEdit, onDelete, onToggleLock }) {
  return (
    <div className="overflow-x-auto w-full rounded border border-white bg-white">
      <div className="overflow-y-auto max-h-[420px]">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                STT
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Tên loại hình tổ chức
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Mã loại hình tổ chức
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Mô tả
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Kích hoạt
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Thời gian thêm mới
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Thời gian cập nhật
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border border-white">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-yellow-200 text-black text-xs">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-400 border border-white text-xs"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id} className={row.locked ? "bg-gray-200" : ""}>
                  <td className="px-3 py-2 border border-white text-center">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2 border border-white">
                    {row.tenNhom}
                  </td>
                  <td className="px-3 py-2 border border-white">
                    {row.maNhom}
                  </td>
                  <td className="px-3 py-2 border border-white">{row.moTa}</td>
                  <td className="px-3 py-2 border border-white text-center">
                    {row.kichHoat === true ? (
                      <FaCheckCircle
                        className="text-green-600 inline"
                        title="Kích hoạt"
                      />
                    ) : (
                      <FaTimesCircle
                        className="text-red-600 inline"
                        title="Chưa kích hoạt"
                      />
                    )}
                  </td>
                  <td className="px-3 py-2 border border-white text-center">
                    {formatDateTime(row.createdAt)}
                  </td>
                  <td className="px-3 py-2 border border-white text-center">
                    {row.updatedAt ? formatDateTime(row.updatedAt) : ""}
                  </td>
                  <td className="px-3 py-2 border border-white">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="text-blue-600"
                        onClick={() => onEdit(row)}
                        disabled={row.locked}
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => onDelete(row)}
                        disabled={row.locked}
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-gray-600"
                        onClick={() => onToggleLock(row)}
                        title={row.locked ? "Mở khóa" : "Khóa"}
                      >
                        {row.locked ? <FaLock /> : <FaLockOpen />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrganizationTypeTable;
