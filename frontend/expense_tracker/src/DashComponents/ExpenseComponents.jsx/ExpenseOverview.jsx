import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";

import CustomLineChart from "../../components/Charts/CustomLineChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("line"); // "bar" or "line"

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg text-gray-900 dark:text-gray-100">
            Expense Overview
          </h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center dark:bg-gray-700 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                chartType === "bar"
                  ? " dark:bg-gray-900 text-purple-700 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
              onClick={() => setChartType("bar")}
            >
              Bar Chart
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                chartType === "line"
                  ? " dark:bg-gray-900 text-purple-700 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
              onClick={() => setChartType("line")}
            >
              Line Chart
            </button>
          </div>
          <button className="add-btn" onClick={onExpenseIncome}>
            <LuPlus className="text-lg" />
            Add Expense
          </button>
        </div>
      </div>
      <div className="mt-10">
        {chartType === "line" ? (
          <CustomLineChart data={chartData} />
        ) : (
          <CustomBarChart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
