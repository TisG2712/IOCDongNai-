import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn, isLoading } = useAuth();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Tự động ẩn notification sau vài giây
  useEffect(() => {
    if (notification) {
      setFadeOut(false); // reset fade effect
      const timer = setTimeout(() => {
        setFadeOut(true); // bắt đầu mờ dần
        setTimeout(() => {
          setNotification(null);
          if (notification.type === "success") {
            // Sử dụng login function từ useAuth hook
            login(username);
            navigate("/dashboard"); // chuyển hướng khi login thành công
          }
        }, 500); // thời gian fade out
      }, 500); // giữ thông báo 2 giây trước khi fade out

      return () => clearTimeout(timer);
    }
  }, [notification, navigate, username, login]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!username) formErrors.username = "Vui lòng nhập tên đăng nhập";
    if (!password) formErrors.password = "Vui lòng nhập mật khẩu";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    // Hard code login
    if (username === "admin" && password === "Gtel@123") {
      setNotification({ type: "success", message: "Đăng nhập thành công!" });
    } else {
      setNotification({
        type: "error",
        message: "Tên đăng nhập hoặc mật khẩu không đúng!",
      });
    }
  };

  // Hiển thị loading nếu đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return (
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Không hiển thị form nếu đã đăng nhập
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-[380px] h-[420px] max-w-md"
      >
        <h2 className="text-2xl font-bold mt-12 mb-9 text-center">Đăng nhập</h2>
        <Input
          id="username"
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên đăng nhập"
          error={errors.username}
          icon="user"
        />
        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          error={errors.password}
          icon="lock"
        />
        <Button type="submit">Đăng nhập</Button>
      </form>

      {/* Notification góc phải */}
      {notification && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white text-sm transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          } ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
