import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * Income Service
 * Handles income-related API calls
 */

export const incomeService = {
  /**
   * Add new income entry
   * @param {Object} incomeData - Income data (title, amount, date, category, description)
   * @returns {Promise} - Created income entry
   */
  addIncome: async (incomeData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, incomeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add income" };
    }
  },

  /**
   * Get all income entries
   * @returns {Promise} - Array of income entries
   */
  getAllIncome: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch income" };
    }
  },

  /**
   * Delete income entry
   * @param {string} incomeId - Income ID to delete
   * @returns {Promise} - Success message
   */
  deleteIncome: async (incomeId) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete income" };
    }
  },

  /**
   * Download income data as Excel
   * @returns {Promise} - Excel file blob
   */
  downloadIncomeExcel: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to download income data" };
    }
  },
};
