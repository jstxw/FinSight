import React from "react";
import { useTheme } from "../../context/ThemeContext";

const AuthLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white dark:bg-gray-900">
        <h2 className="text-lg font-medium text-black dark:text-white">FinSight</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-200 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-[60px] bg-purple-400 z-0 opacity-90" />
        <div className="w-80 h-96 rounded-[60px] border-[32px] border-fuchsia-300 absolute top-[20%] -right-20" />
        <div className="w-72 h-72 rounded-[60px] bg-violet-300 absolute -bottom-16 -left-16" />
        {/* <img
        src={image1graph}
        className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"/> */}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Made by Justin Wang for Shipwrecked 2025
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;

// Removed StatsInfoCard and its usage for a cleaner gradient background
