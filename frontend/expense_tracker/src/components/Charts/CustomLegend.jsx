import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
