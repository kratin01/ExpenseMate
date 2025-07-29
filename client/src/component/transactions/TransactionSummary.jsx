import { formatCurrency } from '../../utils/formatters'; 

// A reusable card component for displaying stats
const StatCard = ({ title, amount, colorClass, icon }) => (
  <div className="bg-white p-5 rounded-2xl shadow-lg flex-1">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className={`text-2xl font-bold mt-1 ${colorClass}`}>
      {formatCurrency(amount)}
    </p>
  </div>
);

const TransactionSummary = ({ summary, loading }) => {
  // Show a loading skeleton while data is being fetched
  if (loading || !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-200 h-24 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-200 h-24 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-200 h-24 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  const { totalIncome, totalExpense, netBalance } = summary;
  const isProfit = netBalance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Income Card */}
      <StatCard 
        title="Total Income" 
        amount={totalIncome} 
        colorClass="text-green-600" 
      />
      
      {/* Expense Card */}
      <StatCard 
        title="Total Expense" 
        amount={totalExpense} 
        colorClass="text-red-600" 
      />
      
      {/* Net Balance Card */}
      <StatCard 
        title={isProfit ? "Net Profit" : "Net Loss"} 
        amount={isProfit ? netBalance : -netBalance} // Show as positive number
        colorClass={isProfit ? "text-blue-600" : "text-red-600"} 
      />
    </div>
  );
};

export default TransactionSummary;