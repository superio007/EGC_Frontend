import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearFilters,
  fetchTransactions,
  fetchCategories,
} from "../../store/slices/transactionSlice";
import {
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const TransactionFilters = () => {
  const dispatch = useDispatch();
  const { filters, categories } = useSelector((state) => state.transactions);
  const [localFilters, setLocalFilters] = useState(filters);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch categories for filter dropdown
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchTransactions(newFilters));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const newFilters = { ...localFilters, search: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchTransactions(newFilters));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      type: "",
      category: "",
      startDate: "",
      endDate: "",
      search: "",
    });
    setSearchTerm("");
    dispatch(clearFilters());
    dispatch(fetchTransactions({}));
  };

  const hasActiveFilters =
    Object.values(localFilters).some((value) => value !== "") ||
    searchTerm !== "";

  // Quick date filters
  const quickDateFilters = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Last 3 Months", value: "3months" },
    { label: "This Year", value: "year" },
  ];

  const handleQuickDateFilter = (period) => {
    const now = new Date();
    let startDate = "";
    let endDate = now.toISOString().split("T")[0];

    switch (period) {
      case "today":
        startDate = endDate;
        break;
      case "week":
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        startDate = weekStart.toISOString().split("T")[0];
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        break;
      case "3months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
          .toISOString()
          .split("T")[0];
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        break;
      default:
        return;
    }

    const newFilters = { ...localFilters, startDate, endDate };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchTransactions(newFilters));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Filters & Search
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Date Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Date Filters
          </label>
          <div className="flex flex-wrap gap-2">
            {quickDateFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleQuickDateFilter(filter.value)}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <CalendarIcon className="h-3 w-3 mr-1" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              value={localFilters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={localFilters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={localFilters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => handleSearchChange("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {localFilters.type && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Type: {localFilters.type}
                  <button
                    onClick={() => handleFilterChange("type", "")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {localFilters.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <TagIcon className="h-3 w-3 mr-1" />
                  {localFilters.category}
                  <button
                    onClick={() => handleFilterChange("category", "")}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {localFilters.startDate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  From: {localFilters.startDate}
                  <button
                    onClick={() => handleFilterChange("startDate", "")}
                    className="ml-1 text-orange-600 hover:text-orange-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {localFilters.endDate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  To: {localFilters.endDate}
                  <button
                    onClick={() => handleFilterChange("endDate", "")}
                    className="ml-1 text-pink-600 hover:text-pink-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;
