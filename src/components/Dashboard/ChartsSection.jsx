import { useSelector } from "react-redux";
import IncomeExpenseChart from "./IncomeExpenseChart";
import CategoryBreakdownChart from "./CategoryBreakdownChart";

const ChartsSection = () => {
  const { analytics, loading } = useSelector((state) => state.summary);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income vs Expenses Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Income vs Expenses
        </h3>
        <IncomeExpenseChart />
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Expense Categories
        </h3>
        <CategoryBreakdownChart data={analytics.expenseBreakdown} />
      </div>
    </div>
  );
};

export default ChartsSection;
