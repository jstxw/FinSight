import React, { useState, useEffect } from "react";
import { dashboardService } from "../../api";

/**
 * EXAMPLE: Dashboard Home Component
 * Shows how to fetch dashboard data using useEffect
 */

const DashboardExample = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array = run once on mount

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // Success state - render dashboard
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {dashboardData && (
        <div className="grid grid-cols-3 gap-4">
          {/* Example: Display stats */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-600">Total Balance</h3>
            <p className="text-2xl font-bold">
              ${dashboardData.totalBalance || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-600">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ${dashboardData.totalIncome || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-600">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ${dashboardData.totalExpenses || 0}
            </p>
          </div>
        </div>
      )}

      {/* Example: Display recent transactions */}
      {dashboardData?.recentTransactions && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
          <div className="bg-white rounded shadow">
            {dashboardData.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="border-b p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardExample;
