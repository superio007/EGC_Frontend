import { useSelector } from "react-redux";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const SummaryCards = () => {
  const { totalIncome, totalExpenses, balance, transactionCount, loading } =
    useSelector((state) => state.summary);

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: ScaleIcon,
      color: balance >= 0 ? "green" : "red",
      bgColor: balance >= 0 ? "bg-green-50" : "bg-red-50",
      iconColor: balance >= 0 ? "text-green-600" : "text-red-600",
      textColor: balance >= 0 ? "text-green-900" : "text-red-900",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: ArrowTrendingUpIcon,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-900",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: ArrowTrendingDownIcon,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      textColor: "text-red-900",
    },
    {
      title: "Transactions",
      value: transactionCount,
      icon: CurrencyDollarIcon,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
      isCount: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
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
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className={`p-2 rounded-md ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.title}
                  </dt>
                  <dd className={`text-lg font-semibold ${card.textColor}`}>
                    {card.isCount
                      ? card.value || 0
                      : ` ₹${(card.value || 0).toFixed(2)}`}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
