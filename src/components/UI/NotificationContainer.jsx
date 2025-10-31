import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { removeNotification } from "../../store/slices/uiSlice";

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />;
      case "error":
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" />;
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const handleRemove = (id) => {
    dispatch(removeNotification(id));
  };

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.autoRemove !== false) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-md border p-4 shadow-lg transition-all duration-300 ease-in-out ${getNotificationStyles(
            notification.type
          )}`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              {notification.title && (
                <h3 className="text-sm font-medium text-gray-800">
                  {notification.title}
                </h3>
              )}
              <div className="text-sm text-gray-700">
                {notification.message}
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => handleRemove(notification.id)}
                className="inline-flex rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
