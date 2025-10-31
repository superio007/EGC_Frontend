import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTransactionForm: false,
  editingTransaction: null,
  sidebarOpen: false,
  theme: "light",
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowTransactionForm: (state, action) => {
      state.showTransactionForm = action.payload;
    },
    setEditingTransaction: (state, action) => {
      state.editingTransaction = action.payload;
      state.showTransactionForm = !!action.payload;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: "info",
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setShowTransactionForm,
  setEditingTransaction,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
