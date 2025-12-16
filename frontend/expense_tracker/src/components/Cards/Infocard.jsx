import React from "react";

const Infocard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white dark:bg-gray-800 p-6 rounded-2x1 shadow-md shadow-gray-100 dark:shadow-gray-900/30 border-gray-200 dark:border-gray-700">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </h6>
        <span className="text-[22px] text-gray-800 dark:text-gray-100">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Infocard;
