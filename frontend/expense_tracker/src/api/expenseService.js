import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * Expense Service
 * Handles expense-related API calls
 */

export const expenseService = {
  /**
   * Add new expense entry
   * @param {Object} expenseData - Expense data (title, amount, date, category, description)
   * @returns {Promise} - Created expense entry
   */
  addExpense: async (expenseData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add expense" };
    }
  },

  /**
   * Get all expense entries
   * @returns {Promise} - Array of expense entries
   */
  getAllExpenses: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch expenses" };
    }
  },

  /**
   * Delete expense entry
   * @param {string} expenseId - Expense ID to delete
   * @returns {Promise} - Success message
   */
  deleteExpense: async (expenseId) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete expense" };
    }
  },

  /**
   * Download expense data as Excel
   * @returns {Promise} - Excel file blob
   */
  downloadExpenseExcel: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to download expense data" };
    }
  },
};
