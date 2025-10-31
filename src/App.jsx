import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchSummary, fetchAnalytics } from "./store/slices/summarySlice";
import { fetchTransactions } from "./store/slices/transactionSlice";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionsPage from "./components/Transactions/TransactionsPage";
import NotificationContainer from "./components/UI/NotificationContainer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load initial data
    dispatch(fetchSummary());
    dispatch(fetchAnalytics());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </Layout>
        <NotificationContainer />
      </Router>
    </div>
  );
}

export default App;
