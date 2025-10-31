import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  createTransaction,
  updateTransaction,
} from "../../store/slices/transactionSlice";
import { fetchSummary, fetchAnalytics } from "../../store/slices/summarySlice";
import {
  setShowTransactionForm,
  setEditingTransaction,
  addNotification,
} from "../../store/slices/uiSlice";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const { editingTransaction } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.transactions);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common categories for suggestions
  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];

  useEffect(() => {
    if (editingTransaction) {
      setValue("type", editingTransaction.type);
      setValue("amount", editingTransaction.amount);
      setValue("description", editingTransaction.description);
      setValue("category", editingTransaction.category);
      setValue(
        "date",
        new Date(editingTransaction.date).toISOString().split("T")[0]
      );
    } else {
      reset();
      setValue("date", new Date().toISOString().split("T")[0]);
    }
  }, [editingTransaction, setValue, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingTransaction) {
        await dispatch(
          updateTransaction({ id: editingTransaction._id, data })
        ).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "Transaction updated successfully!",
          })
        );
      } else {
        await dispatch(createTransaction(data)).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "Transaction created successfully!",
          })
        );
      }

      // Refresh summary and analytics
      dispatch(fetchSummary());
      dispatch(fetchAnalytics());

      handleClose();
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: error.message || "Failed to save transaction",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(setShowTransactionForm(false));
    dispatch(setEditingTransaction(null));
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {editingTransaction
                  ? "Edit Transaction"
                  : "Add New Transaction"}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  {...register("type", {
                    required: "Transaction type is required",
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 255,
                      message: "Description must be less than 255 characters",
                    },
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                    maxLength: {
                      value: 50,
                      message: "Category must be less than 50 characters",
                    },
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter category"
                  list="categories"
                />
                <datalist id="categories">
                  {[...expenseCategories, ...incomeCategories].map(
                    (category) => (
                      <option key={category} value={category} />
                    )
                  )}
                </datalist>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="flex-1 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingTransaction
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
