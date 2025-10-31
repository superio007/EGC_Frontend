import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import summaryReducer from "./slices/summarySlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    summary: summaryReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
