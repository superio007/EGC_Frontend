import { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ExportButton = () => {
  const { items: transactions } = useSelector((state) => state.transactions);
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    setIsExporting(true);

    try {
      // Prepare CSV headers
      const headers = ["Date", "Type", "Description", "Category", "Amount"];

      // Prepare CSV data
      const csvData = transactions.map((transaction) => [
        new Date(transaction.date).toLocaleDateString(),
        transaction.type,
        `"${transaction.description}"`, // Wrap in quotes to handle commas
        transaction.category,
        transaction.amount.toFixed(2),
      ]);

      // Combine headers and data
      const csvContent = [headers, ...csvData]
        .map((row) => row.join(","))
        .join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `transactions_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export transactions");
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    if (transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    setIsExporting(true);

    try {
      const jsonData = JSON.stringify(transactions, null, 2);
      const blob = new Blob([jsonData], {
        type: "application/json;charset=utf-8;",
      });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `transactions_${new Date().toISOString().split("T")[0]}.json`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error exporting JSON:", error);
      alert("Failed to export transactions");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex space-x-2">
        <button
          onClick={exportToCSV}
          disabled={isExporting || transactions.length === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </button>

        <button
          onClick={exportToJSON}
          disabled={isExporting || transactions.length === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export JSON"}
        </button>
      </div>

      {transactions.length === 0 && (
        <p className="mt-1 text-xs text-gray-500">
          No transactions available to export
        </p>
      )}
    </div>
  );
};

export default ExportButton;
