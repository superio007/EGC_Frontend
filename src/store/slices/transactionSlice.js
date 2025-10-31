import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionAPI } from "../../utils/api";

// Async thunks for API calls
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getTransactions(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch transactions" }
      );
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.createTransaction(transactionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create transaction" }
      );
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.updateTransaction(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update transaction" }
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, { rejectWithValue }) => {
    try {
      await transactionAPI.deleteTransaction(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete transaction" }
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async (type, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getCategories(type);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch categories" }
      );
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  },
  pagination: {
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false,
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to fetch transactions";
      })

      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.data);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to create transaction";
      })

      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to update transaction";
      })

      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error?.message || "Failed to delete transaction";
      })

      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      });
  },
});

export const { setFilters, clearFilters, clearError, setPagination } =
  transactionSlice.actions;
export default transactionSlice.reducer;
