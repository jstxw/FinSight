import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * Authentication Service
 * Handles all auth-related API calls
 */

export const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Response with token and user data
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Response with token and user data
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  /**
   * Get current user info
   * @returns {Promise} - User data
   */
  getUserInfo: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user info" };
    }
  },

  /**
   * Upload user profile image
   * @param {FormData} formData - Form data with image file
   * @returns {Promise} - Response with image URL
   */
  uploadImage: async (formData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Image upload failed" };
    }
  },

  /**
   * Logout user (client-side)
   */
  logout: () => {
    localStorage.removeItem("token");
  },
};
