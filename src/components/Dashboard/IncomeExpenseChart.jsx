import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = () => {
  const { totalIncome, totalExpenses } = useSelector((state) => state.summary);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome || 0, totalExpenses || 0],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // Green for income
          "rgba(239, 68, 68, 0.8)", // Red for expenses
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}:  ₹${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  // Show message if no data
  if (!totalIncome && !totalExpenses) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No data available</p>
          <p className="text-sm">Add some transactions to see the chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;
