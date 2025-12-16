import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useState } from "react";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="text-[13px] text-slate-800 dark:text-gray-300 block mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          value={value}
          onChange={onChange}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none border border-gray-300 dark:border-gray-700 p-2 rounded-md placeholder-gray-400 dark:placeholder-gray-500"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
        />

        {type === "password" && (
          <span
            onClick={toggleShowPassword}
            className="absolute right-2 cursor-pointer"
          >
            {showPassword ? (
              <FaRegEye size={18} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={18} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
