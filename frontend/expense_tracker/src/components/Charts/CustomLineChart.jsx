import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const CustomLineChart = ({ data }) => {
  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains("dark");
  const axisColor = isDarkMode ? "#9ca3af" : "#6b7280";
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`shadow-md rounded-lg p-2 border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
          <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-800'}`}>
            {payload[0]?.payload?.month}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Amount:{" "}
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              ${payload[0]?.value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: axisColor }}
            stroke={axisColor}
          />
          <YAxis tick={{ fontSize: 12, fill: axisColor }} stroke={axisColor} />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#7c3aed" // purple-600
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
