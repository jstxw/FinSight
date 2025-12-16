import React from "react";
import DashboardLayout from "../../../components/Layouts/Dashboardlayout";

const About = () => (
  <DashboardLayout activeMenu="About this website">
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
        About This Website
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
        <strong>Visualization and Expenses Tracker</strong> is a modern,
        user-friendly web application designed to help you manage your personal
        finances with ease and clarity. Our platform empowers users to:
      </p>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>Securely register and log in to their own private dashboard.</li>
        <li>
          Add, view, and delete income and expense entries, each tied to their
          unique account.
        </li>
        <li>
          Visualize financial data with interactive charts and graphs for better
          insights.
        </li>
        <li>
          Download income and expense reports in Excel format for offline
          analysis.
        </li>
        <li>
          Track recent transactions, monitor trends, and see summaries for the
          last 30/60 days.
        </li>
        <li>
          Enjoy a responsive, intuitive interface built with the latest web
          technologies.
        </li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300 text-base">
        Whether you're budgeting for personal goals or simply want a clearer
        picture of your finances, this website provides all the tools you need
        to stay organized and make informed decisions. Your data is private,
        secure, and only visible to you.
      </p>
      <div className="mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Visualization and Expenses Tracker.
        All rights reserved.
      </div>
    </div>
  </DashboardLayout>
);

export default About;
