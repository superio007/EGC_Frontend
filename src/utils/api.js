import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Transaction API endpoints
export const transactionAPI = {
  // Get all transactions with optional filters
  getTransactions: (params = {}) => {
    return api.get("/transactions", { params });
  },

  // Get single transaction by ID
  getTransaction: (id) => {
    return api.get(`/transactions/${id}`);
  },

  // Create new transaction
  createTransaction: (data) => {
    return api.post("/transactions", data);
  },

  // Update transaction
  updateTransaction: (id, data) => {
    return api.put(`/transactions/${id}`, data);
  },

  // Delete transaction
  deleteTransaction: (id) => {
    return api.delete(`/transactions/${id}`);
  },

  // Get summary data
  getSummary: () => {
    return api.get("/analytics/summary");
  },

  // Get analytics data
  getAnalytics: () => {
    return api.get("/analytics/analytics");
  },

  // Get categories
  getCategories: (type) => {
    const params = type ? { type } : {};
    return api.get("/analytics/categories", { params });
  },
};

export default api;
