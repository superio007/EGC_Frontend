import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearFilters,
  fetchTransactions,
} from "../../store/slices/transactionSlice";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FilterControls = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.transactions);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    dispatch(setFilters(newFilters));
    dispatch(fetchTransactions(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchTransactions({}));
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full text-sm rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            placeholder="Filter by category"
            className="w-full text-sm rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            className="w-full text-sm rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            className="w-full text-sm rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.type && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Type: {filters.type}
              <button
                onClick={() => handleFilterChange("type", "")}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange("category", "")}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.startDate && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              From: {filters.startDate}
              <button
                onClick={() => handleFilterChange("startDate", "")}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.endDate && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              To: {filters.endDate}
              <button
                onClick={() => handleFilterChange("endDate", "")}
                className="ml-1 text-orange-600 hover:text-orange-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;
