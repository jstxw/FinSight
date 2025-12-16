import React from "react";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 dark:text-gray-400">
        No data to display
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomToolTip} wrapperStyle={{ outline: 'none' }} />
        <Legend content={CustomLegend} />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              className="fill-gray-600 dark:fill-gray-400"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-200"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
