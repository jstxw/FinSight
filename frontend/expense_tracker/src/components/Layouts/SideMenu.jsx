//import React from 'react'
import { SIDE_MENU_DATA } from "../../utils/data";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CharAvater from "../Cards/CharAvater";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route.toLowerCase() === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/");
      return;
    }
    navigate(route);
  };

  const handleLogin = (route) => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200/50 dark:border-gray-700 p-5 overflow-y-auto">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvater
            fullName={user?.fullName || "Guest User"}
            wdith="w-20"
            height="h-20"
            stlye="text-xl"
          />
        )}
        <h5 className="text-gray-950 dark:text-gray-100 font-medium leading-6">
          {user?.fullName || "Guest User"}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] px-4 py-2 rounded-lg mb-3 transition-colors duration-300
            ${
              activeMenu === item.label
                ? "text-white bg-purple-700"
                : "text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-purple-700 hover:text-white"
            }
          `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
