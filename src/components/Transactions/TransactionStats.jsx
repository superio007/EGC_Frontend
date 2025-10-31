import { useSelector } from "react-redux";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ScaleIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const TransactionStats = () => {
  const { totalIncome, totalExpenses, balance, transactionCount, loading } =
    useSelector((state) => state.summary);
  const { items: transactions } = useSelector((state) => state.transactions);

  // Calculate additional stats
  const avgTransactionAmount =
    transactions.length > 0
      ? (totalIncome + totalExpenses) / transactions.length
      : 0;

  const incomeTransactions = transactions.filter(
    (t) => t.type === "income"
  ).length;
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  ).length;

  const stats = [
    {
      title: "Net Balance",
      value: balance,
      icon: ScaleIcon,
      color: balance >= 0 ? "green" : "red",
      bgColor: balance >= 0 ? "bg-green-50" : "bg-red-50",
      iconColor: balance >= 0 ? "text-green-600" : "text-red-600",
      textColor: balance >= 0 ? "text-green-900" : "text-red-900",
      format: "currency",
      subtitle: balance >= 0 ? "Positive balance" : "Negative balance",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: ArrowTrendingUpIcon,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-900",
      format: "currency",
      subtitle: `${incomeTransactions} transactions`,
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: ArrowTrendingDownIcon,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      textColor: "text-red-900",
      format: "currency",
      subtitle: `${expenseTransactions} transactions`,
    },
    {
      title: "Total Transactions",
      value: transactionCount,
      icon: CurrencyDollarIcon,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
      format: "number",
      subtitle: "All time",
    },
    {
      title: "Average Amount",
      value: avgTransactionAmount,
      icon: CalculatorIcon,
      color: "purple",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-900",
      format: "currency",
      subtitle: "Per transaction",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow-sm rounded-lg animate-pulse"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className={`text-lg font-semibold ${stat.textColor}`}>
                    {stat.format === "currency"
                      ? `₹${(stat.value || 0).toFixed(2)}`
                      : (stat.value || 0).toLocaleString()}
                  </dd>
                  <dd className="text-xs text-gray-400">{stat.subtitle}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionStats;
