import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to get bar color with hover state
  const getBarColor = (index) => {
    // If this bar is hovered, return hover color
    if (hoveredIndex === index) {
      return "#6d28d9"; // Hover color (darker purple)
    }
    // Otherwise return alternating colors
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains("dark");
  const axisColor = isDarkMode ? "#9ca3af" : "#6b7280";
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`shadow-lg rounded-lg p-3 border ${isDarkMode ? 'bg-gray-800 border-purple-500' : 'bg-white border-gray-200'}`}>
          <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
            {payload[0].payload.category}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Amount:{" "}
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 dark:text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: axisColor }}
            stroke={axisColor}
          />
          <YAxis tick={{ fontSize: 12, fill: axisColor }} stroke={axisColor} />
          <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }} />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            onMouseEnter={(data, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={getBarColor(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
