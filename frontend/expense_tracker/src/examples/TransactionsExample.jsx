import React, { useState, useEffect } from "react";
import { incomeService, expenseService } from "../../api";

/**
 * EXAMPLE: Transactions Component
 * Shows how to fetch income and expenses, and how to add/delete them
 */

const TransactionsExample = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both income and expenses on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch in parallel for better performance
        const [incomeData, expenseData] = await Promise.all([
          incomeService.getAllIncome(),
          expenseService.getAllExpenses(),
        ]);

        setIncome(incomeData.income || []);
        setExpenses(expenseData.expenses || []);
      } catch (err) {
        setError(err.message || "Failed to load transactions");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add new income
  const handleAddIncome = async (incomeData) => {
    try {
      const newIncome = await incomeService.addIncome(incomeData);
      setIncome([...income, newIncome.income]);
      alert("Income added successfully!");
    } catch (err) {
      alert(err.message || "Failed to add income");
    }
  };

  // Delete income
  const handleDeleteIncome = async (incomeId) => {
    try {
      await incomeService.deleteIncome(incomeId);
      setIncome(income.filter((item) => item._id !== incomeId));
      alert("Income deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete income");
    }
  };

  // Add new expense
  const handleAddExpense = async (expenseData) => {
    try {
      const newExpense = await expenseService.addExpense(expenseData);
      setExpenses([...expenses, newExpense.expense]);
      alert("Expense added successfully!");
    } catch (err) {
      alert(err.message || "Failed to add expense");
    }
  };

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      await expenseService.deleteExpense(expenseId);
      setExpenses(expenses.filter((item) => item._id !== expenseId));
      alert("Expense deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete expense");
    }
  };

  // Download Excel
  const handleDownloadIncomeExcel = async () => {
    try {
      const blob = await incomeService.downloadIncomeExcel();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `income_${Date.now()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || "Failed to download");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Income Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Income</h2>
          <button
            onClick={handleDownloadIncomeExcel}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>
        </div>

        <div className="space-y-2">
          {income.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-600">${item.amount}</span>
                <button
                  onClick={() => handleDeleteIncome(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expenses Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Expenses</h2>
        <div className="space-y-2">
          {expenses.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-red-600">${item.amount}</span>
                <button
                  onClick={() => handleDeleteExpense(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example: Add Income Form (simplified) */}
      <section className="mt-8 bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Example Add Income</h3>
        <button
          onClick={() =>
            handleAddIncome({
              title: "Salary",
              amount: 5000,
              category: "Salary",
              description: "Monthly salary",
              date: new Date(),
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Sample Income
        </button>
      </section>
    </div>
  );
};

export default TransactionsExample;
