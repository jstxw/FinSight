import React from "react";
import DashboardLayout from "../../../components/Layouts/Dashboardlayout";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../../../context/ThemeContext";

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="card">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Manage your application preferences and customize your experience.
          </p>

          {/* Appearance Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Appearance
              </h2>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    {isDarkMode ? (
                      <LuMoon className="text-xl text-purple-700 dark:text-purple-400" />
                    ) : (
                      <LuSun className="text-xl text-purple-700 dark:text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Dark Mode
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isDarkMode
                        ? "Switch to light theme for a brighter interface"
                        : "Switch to dark theme for a comfortable viewing experience"}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    isDarkMode ? "bg-purple-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Additional Settings Sections (Placeholder) */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                More Settings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Additional settings will be available here in future updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
