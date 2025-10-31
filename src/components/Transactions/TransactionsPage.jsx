import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  setFilters,
  clearFilters,
} from "../../store/slices/transactionSlice";
import { fetchSummary } from "../../store/slices/summarySlice";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import TransactionStats from "./TransactionStats";
import TransactionForm from "./TransactionForm";
import ExportButton from "./ExportButton";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const {
    items: transactions,
    loading,
    filters,
    pagination,
  } = useSelector((state) => state.transactions);
  const { showTransactionForm } = useSelector((state) => state.ui);

  useEffect(() => {
    // Load transactions and summary when component mounts
    dispatch(fetchTransactions(filters));
    dispatch(fetchSummary());
  }, [dispatch, filters]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and analyze your financial transactions
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <ExportButton />
        </div>
      </div>

      {/* Transaction Statistics */}
      <TransactionStats />

      {/* Advanced Filters */}
      <TransactionFilters />

      {/* Transaction List */}
      <TransactionList
        transactions={transactions}
        loading={loading}
        pagination={pagination}
      />

      {/* Transaction Form Modal */}
      {showTransactionForm && <TransactionForm />}
    </div>
  );
};

export default TransactionsPage;
