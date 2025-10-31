# Expense Tracker Frontend

A modern, responsive React application for managing personal finances with beautiful UI components and comprehensive analytics.

## 🚀 Features

### 📊 Dashboard

- **Summary Cards**: Real-time display of balance, income, expenses, and transaction count
- **Visual Charts**:
  - Income vs Expenses doughnut chart
  - Category breakdown bar chart
- **Recent Transactions**: Quick view of latest 10 transactions with edit/delete actions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### 💰 Transaction Management

- **Add Transactions**: Modal form with validation for creating income/expense entries
- **Edit Transactions**: In-place editing with pre-filled forms
- **Delete Transactions**: Confirmation dialogs with soft delete functionality
- **Form Validation**: Real-time validation with error messages
- **Category Suggestions**: Auto-complete for common income/expense categories

### 🔍 Advanced Analytics Page

- **Comprehensive Statistics**: 5 detailed stat cards including averages and breakdowns
- **Advanced Filtering System**:
  - Search by transaction description
  - Filter by transaction type (income/expense)
  - Filter by category
  - Custom date range selection
  - Quick date filters (Today, This Week, Month, etc.)
- **Professional Data Display**:
  - Desktop: Sortable table with pagination
  - Mobile: Card-based layout
  - Export functionality (CSV/JSON)
- **Active Filter Management**: Visual filter tags with individual removal

### 🎨 User Interface

- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Responsive Navigation**: Collapsible sidebar with active state indicators
- **Loading States**: Skeleton loaders and spinners for better UX
- **Toast Notifications**: Success/error messages with auto-dismiss
- **Dark/Light Theme Ready**: Prepared for theme switching

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Tablet Support**: Adaptive layouts for medium screen sizes
- **Desktop Experience**: Full-featured interface with advanced interactions

## 🛠 Technology Stack

### Core Technologies

- **React 18**: Latest React with functional components and hooks
- **Redux Toolkit**: Modern Redux for state management
- **React Router**: Client-side routing for SPA navigation
- **Vite**: Fast build tool and development server

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **Headless UI**: Unstyled, accessible UI components

### Data & Forms

- **React Hook Form**: Performant forms with easy validation
- **Chart.js**: Interactive charts and data visualization
- **React Chart.js 2**: React wrapper for Chart.js
- **Axios**: HTTP client for API communication
- **date-fns**: Modern date utility library

## 📁 Project Structure

```
root/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard/     # Dashboard-specific components
│   │   ├── Layout/        # Layout and navigation
│   │   ├── Transaction/   # Transaction management
│   │   ├── Transactions/  # Analytics page components
│   │   └── UI/           # Reusable UI components
│   ├── store/            # Redux store configuration
│   │   └── slices/       # Redux slices
│   ├── utils/            # Utility functions and API client
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Component Architecture

### State Management (Redux Toolkit)

- **transactionSlice**: Manages transaction data, filters, and CRUD operations
- **summarySlice**: Handles analytics data and summary statistics
- **uiSlice**: Controls UI state (modals, notifications, theme)

### Key Components

- **Layout**: Main application layout with responsive sidebar
- **Dashboard**: Overview page with charts and recent transactions
- **TransactionsPage**: Comprehensive analytics and transaction management
- **TransactionForm**: Reusable form for creating/editing transactions
- **TransactionList**: Advanced table/card view with pagination
- **FilterControls**: Advanced filtering interface
- **Charts**: Data visualization components

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   # Create .env file
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🔌 API Integration

### Endpoints Used

- `GET /api/transactions` - Fetch transactions with filtering
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update existing transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/analytics/summary` - Get summary statistics
- `GET /api/analytics/analytics` - Get detailed analytics data
- `GET /api/analytics/categories` - Get available categories

### Error Handling

- **Network Errors**: Automatic retry mechanisms
- **Validation Errors**: Form-level error display
- **Server Errors**: User-friendly error messages
- **Loading States**: Skeleton loaders and spinners

## 📊 Features in Detail

### Dashboard Features

- **Real-time Summary**: Live updates of financial statistics
- **Interactive Charts**: Hover effects and tooltips
- **Quick Actions**: Fast access to add transactions
- **Recent Activity**: Latest transactions with quick edit/delete

### Analytics Page Features

- **Advanced Search**: Full-text search across transaction descriptions
- **Multi-level Filtering**: Combine multiple filters for precise results
- **Export Options**: Download data in CSV or JSON format
- **Pagination**: Handle large datasets efficiently
- **Responsive Tables**: Adaptive layouts for all screen sizes

### Form Features

- **Real-time Validation**: Instant feedback on form inputs
- **Auto-complete**: Smart suggestions for categories
- **Date Handling**: Intuitive date picker with defaults
- **Error Recovery**: Clear error messages and recovery paths

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Optimized search input handling
- **Efficient Re-renders**: Optimized Redux selectors
- **Image Optimization**: Optimized assets and icons

## 🔒 Security Features

- **Input Sanitization**: XSS prevention on all inputs
- **CSRF Protection**: Token-based request validation
- **Environment Variables**: Secure API endpoint configuration
- **Error Boundaries**: Graceful error handling

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

```bash
VITE_API_URL=https://your-api-domain.com/api
```

### Deployment Options

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Development server won't start**

- Check Node.js version (v16+ required)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**API connection issues**

- Verify backend is running on port 5000
- Check VITE_API_URL in .env file
- Ensure CORS is configured on backend

**Build failures**

- Check for TypeScript errors
- Verify all dependencies are installed
- Clear build cache: `rm -rf dist && npm run build`

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check existing documentation
- Review the troubleshooting section above
