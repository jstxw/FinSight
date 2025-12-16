import React from "react";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useEffect } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import CustomLineChart from "../../components/Charts/CustomLineChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("bar"); // "bar" or "line"

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg text-gray-900 dark:text-gray-100">
            Income Overview
          </h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                chartType === "bar"
                  ? "bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
              onClick={() => setChartType("bar")}
            >
              Bar Chart
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                chartType === "line"
                  ? "bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
              onClick={() => setChartType("line")}
            >
              Line Chart
            </button>
          </div>
          <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" />
            Add Income
          </button>
        </div>
      </div>

      <div className="mt-10">
        {chartType === "bar" ? (
          <CustomBarChart data={chartData} />
        ) : (
          <CustomLineChart data={chartData} />
        )}
      </div>
    </div>
  );
};
export default IncomeOverview;
