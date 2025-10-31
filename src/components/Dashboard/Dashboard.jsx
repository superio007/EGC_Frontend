import { useSelector } from "react-redux";
import SummaryCards from "./SummaryCards";
import ChartsSection from "./ChartsSection";
import RecentTransactions from "./RecentTransactions";
import TransactionForm from "../Transaction/TransactionForm";
import FilterControls from "../Transaction/FilterControls";

const Dashboard = () => {
  const { showTransactionForm } = useSelector((state) => state.ui);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Filter Controls */}
      <FilterControls />

      {/* Charts Section */}
      <ChartsSection />

      {/* Recent Transactions */}
      <RecentTransactions />

      {/* Transaction Form Modal */}
      {showTransactionForm && <TransactionForm />}
    </div>
  );
};

export default Dashboard;
