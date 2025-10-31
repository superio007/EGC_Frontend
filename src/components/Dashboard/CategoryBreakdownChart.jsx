import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryBreakdownChart = ({ data = [] }) => {
  // Generate colors for categories
  const generateColors = (count) => {
    const colors = [
      "rgba(59, 130, 246, 0.8)", // Blue
      "rgba(16, 185, 129, 0.8)", // Green
      "rgba(245, 101, 101, 0.8)", // Red
      "rgba(251, 191, 36, 0.8)", // Yellow
      "rgba(139, 92, 246, 0.8)", // Purple
      "rgba(236, 72, 153, 0.8)", // Pink
      "rgba(20, 184, 166, 0.8)", // Teal
      "rgba(251, 146, 60, 0.8)", // Orange
    ];

    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Amount (₹)",
        data: data.map((item) => item.amount),
        backgroundColor: generateColors(data.length),
        borderColor: generateColors(data.length).map((color) =>
          color.replace("0.8", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y || 0;
            const item = data[context.dataIndex];
            return [
              `Amount: ₹${value.toFixed(2)}`,
              `Transactions: ${item?.count || 0}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value.toFixed(0);
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  // Show message if no data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No expense data</p>
          <p className="text-sm">
            Add some expense transactions to see the breakdown
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryBreakdownChart;
