import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage khi component mount
    const checkAuthStatus = () => {
      try {
        const loginStatus = localStorage.getItem("isLoggedIn");
        const storedUsername = localStorage.getItem("username");

        setIsLoggedIn(loginStatus === "true");
        setUsername(storedUsername || "");
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setUsername("");
      } finally {
        setIsLoading(false); // Đánh dấu đã kiểm tra xong
      }
    };

    checkAuthStatus();

    // Lắng nghe sự thay đổi trong localStorage
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (username) => {
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      setUsername(username);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      setUsername("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    isLoggedIn,
    username,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
