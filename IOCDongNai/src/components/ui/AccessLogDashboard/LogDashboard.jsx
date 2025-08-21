import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const LogDashboard = ({ data }) => {
  if (!data) return <p>Không có dữ liệu</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Biểu đồ cột: User Access By Time */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-sm font-semibold mb-3">Truy cập theo ngày</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data.userAccessByTime.data.map((count, i) => ({
              date: data.userAccessByTime.labels[i],
              accessCount: count,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="accessCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ tròn: Common Devices */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-sm font-semibold mb-3">Thiết bị truy cập</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data.commonDevices}
              dataKey="accessCount"
              nameKey="device"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.commonDevices.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ đường: Peak Hours */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-sm font-semibold mb-3">Khung giờ cao điểm</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.peakHours}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accessCount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LogDashboard;
