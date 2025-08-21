import React from "react";
import {
  FaEdit,
  FaTrash,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Hàm format ngày giờ
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

function AccessLogTable({ data, onEdit, onDelete, onToggleLock }) {
  return (
    <div className="overflow-x-auto w-full rounded border border-white bg-white">
      <div className="overflow-y-auto max-h-[420px]">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                STT
              </th>

              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Mô tả
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Mức độ quan trọng
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Trạng thái truy cập
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Thời gian truy cập
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Địa chỉ IP
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-yellow-200 text-black text-xs">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-4 text-gray-400 border-white border text-xs"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id} className={row.locked ? "bg-gray-200" : ""}>
                  <td className="px-3 py-2 border-white border text-center text-xs">
                    {idx + 1}
                  </td>

                  <td className="px-3 py-2 border-white border">{row.moTa}</td>
                  <td className="px-3 py-2 border-white border">
                    {row.mucDoQuanTrong}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.trangThaiTruyCap === "Thành công" ? (
                      <FaCheckCircle
                        className="text-green-600 inline"
                        title="Thành công"
                      />
                    ) : (
                      <FaTimesCircle
                        className="text-red-600 inline"
                        title="Thất bại"
                      />
                    )}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {formatDateTime(row.thoiGianTruyCap)}
                  </td>
                  <td className="px-3 py-2 border-white border">
                    {row.diaChiIP}
                  </td>
                  <td className="px-3 py-2 border-white border">
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

export default AccessLogTable;
