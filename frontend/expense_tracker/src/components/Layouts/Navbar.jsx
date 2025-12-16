import React from "react";
import { LuWalletMinimal } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 relative z-20 shadow-lg bg-purple-600 dark:bg-gray-900 dark:border-b dark:border-gray-700">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <LuWalletMinimal className="text-3xl text-white drop-shadow-md" />
          <h2 className="text-2xl font-light text-white tracking-wider drop-shadow-md">
            FinSight
          </h2>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
