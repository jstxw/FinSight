import React from "react";

const CustomTooltip = ({ active, payload }) => {
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (active && payload && payload.length) {
    return (
      <div className={`rounded-md shadow-md p-3 border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {payload[0].name}
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Amount:{" "}
          <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
