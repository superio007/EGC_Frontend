import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionAPI } from "../../utils/api";

// Async thunks for API calls
export const fetchSummary = createAsyncThunk(
  "summary/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getSummary();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch summary" }
      );
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "summary/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch analytics" }
      );
    }
  }
);

const initialState = {
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  transactionCount: 0,
  analytics: {
    expenseBreakdown: [],
    incomeBreakdown: [],
    monthlyTrends: {},
    recentTransactions: [],
  },
  loading: false,
  error: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch summary
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loading = false;
        const { totalIncome, totalExpenses, balance, transactionCount } =
          action.payload.data;
        state.totalIncome = totalIncome;
        state.totalExpenses = totalExpenses;
        state.balance = balance;
        state.transactionCount = transactionCount;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to fetch summary";
      })

      // Fetch analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload.data;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to fetch analytics";
      });
  },
});

export const { clearError } = summarySlice.actions;
export default summarySlice.reducer;
