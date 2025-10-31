import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  PencilIcon,
  TrashIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import {
  setEditingTransaction,
  addNotification,
} from "../../store/slices/uiSlice";
import { deleteTransaction } from "../../store/slices/transactionSlice";
import { fetchSummary, fetchAnalytics } from "../../store/slices/summarySlice";

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const { items: transactions, loading } = useSelector(
    (state) => state.transactions
  );

  const handleEdit = (transaction) => {
    dispatch(setEditingTransaction(transaction));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await dispatch(deleteTransaction(id)).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "Transaction deleted successfully!",
          })
        );

        // Refresh summary and analytics
        dispatch(fetchSummary());
        dispatch(fetchAnalytics());
      } catch (error) {
        dispatch(
          addNotification({
            type: "error",
            message: error.message || "Failed to delete transaction",
          })
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Transactions
        </h3>

        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <ArrowTrendingUpIcon className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm">No transactions yet</p>
            <p className="text-gray-400 text-xs">
              Add your first transaction to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(transaction.date), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                  </span>

                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit transaction"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete transaction"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {transactions.length > 10 && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all transactions ({transactions.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
