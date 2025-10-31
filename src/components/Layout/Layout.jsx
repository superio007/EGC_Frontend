import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  setShowTransactionForm,
  setSidebarOpen,
} from "../../store/slices/uiSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { balance, totalIncome, totalExpenses } = useSelector(
    (state) => state.summary
  );

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: ChartBarIcon,
      current: location.pathname === "/",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: DocumentTextIcon,
      current: location.pathname === "/transactions",
    },
  ];
  const handclick = (href) => {
    dispatch(setSidebarOpen(false));
    navigate(href);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <div
                key={item.name}
                onClick={() => handclick(item?.href)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 shrink-0" />
                {item.name}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Balance</span>
                <span
                  className={`text-sm font-semibold ${
                    balance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{balance?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Income</span>
                <span className="text-sm font-semibold text-green-600">
                  ₹{totalIncome?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Expenses</span>
                <span className="text-sm font-semibold text-red-600">
                  ₹{totalExpenses?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Add Transaction Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => dispatch(setShowTransactionForm(true))}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => dispatch(setSidebarOpen(true))}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {location.pathname === "/transactions"
                  ? "Transactions"
                  : "Dashboard"}
              </h2>
            </div>

            <button
              onClick={() => dispatch(setShowTransactionForm(true))}
              className="lg:hidden flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
