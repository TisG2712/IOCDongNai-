import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    // Chờ AuthContext khởi tạo xong
    if (isLoading) return;

    // Kiểm tra trạng thái đăng nhập
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng về trang login
      navigate("/", { replace: true });
      return;
    }

    // Ngăn người dùng truy cập trực tiếp vào trang login khi đã đăng nhập
    if (location.pathname === "/" && isLoggedIn) {
      navigate("/dashboard", { replace: true });
      return;
    }
  }, [navigate, location.pathname, isLoggedIn, isLoading]);

  // Hiển thị loading hoặc kiểm tra trạng thái đăng nhập trước khi render
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Không render gì khi chưa đăng nhập
  }

  return children;
};

export default ProtectedRoute;
