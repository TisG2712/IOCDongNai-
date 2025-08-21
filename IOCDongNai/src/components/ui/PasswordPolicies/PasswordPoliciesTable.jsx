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
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )} - ${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}

function PasswordPoliciesTable({ data, onEdit, onDelete, onToggleLock }) {
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
                Tên điều khoản
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Ngày hết hạn
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Thời gian khóa (phút)
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Số lần nhập sai
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Chiều dài mật khẩu
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Ký tự số
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Chữ hoa
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Chữ thường
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Ký tự đặc biệt
              </th>
              <th className="sticky top-0 z-10 bg-red-700 px-3 py-2 text-white font-normal border-white border">
                Kích hoạt
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
                  colSpan={12}
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
                  <td className="px-3 py-2 border-white border">
                    {row.tenNhom}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.ngayHetHan}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.thoiGianKhoa}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.soLanNhapSai}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.chieuDaiMatKhau}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.kyTuSo ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.kyTuChuHoa ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.kyTuChuThuong ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.kyTuDacBiet ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
                  </td>
                  <td className="px-3 py-2 border-white border text-center">
                    {row.kichHoat ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
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

export default PasswordPoliciesTable;
