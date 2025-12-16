import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * Dashboard Service
 * Handles dashboard-related API calls
 */

export const dashboardService = {
  /**
   * Get dashboard data (overview, stats, recent transactions)
   * @returns {Promise} - Dashboard data
   */
  getDashboardData: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch dashboard data" };
    }
  },
};
