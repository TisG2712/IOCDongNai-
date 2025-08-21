import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import LogDashboard from "../../components/ui/AccessLogDashboard/LogDashboard";

const AccessLogDashboard = () => {
  const [logData, setLogData] = useState(null);

  useEffect(() => {
    // Đây là chỗ bạn call API backend thật sự
    // Ở đây mình demo với dữ liệu mà bạn gửi
    const response = {
      body: {
        commonDevices: [
          { accessCount: 31, device: "Desktop" },
          { accessCount: 1, device: "Unknown" },
        ],
        peakHours: [
          { accessCount: 19, hour: 9 },
          { accessCount: 16, hour: 10 },
          { accessCount: 14, hour: 8 },
          { accessCount: 13, hour: 14 },
          { accessCount: 12, hour: 16 },
        ],
        userAccessByTime: {
          data: [1, 4, 5, 3],
          labels: ["2025-08-18", "2025-08-19", "2025-08-20", "2025-08-21"],
        },
        statsByUnit: [{ accessCount: 32, unitName: "Công ty ABC", unitId: 1 }],
      },
    };
    setLogData(response.body);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <div className="container px-4 py-6">
        <h1 className="text-xl text-center font-semibold mb-4">
          Biểu đồ thống kê truy cập
        </h1>
        <LogDashboard data={logData} />
      </div>
      <Footer />
    </div>
  );
};

export default AccessLogDashboard;
