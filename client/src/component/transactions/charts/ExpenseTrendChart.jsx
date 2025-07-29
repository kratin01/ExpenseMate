// src/components/charts/ExpenseTrendChart.js
// This component displays a line chart of expenses over time using Recharts.
// It adapts to screen size and shows a smooth expense trend with tooltips and a legend.

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseTrendChart = ({ data }) => {
  // If there is no expense data, display a placeholder message
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No expense data available</p>;
  }

  return (
    // ResponsiveContainer ensures the chart adjusts to parent size
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        
        {/* Grid lines for better readability */}
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X-axis using _id (could represent date or category) */}
        <XAxis dataKey="_id" />
        
        {/* Y-axis for expense amount */}
        <YAxis />
        
        {/* Tooltip to show formatted expense values on hover */}
        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
        
        {/* Legend to label lines */}
        <Legend />
        
        {/* Main line for expense trend */}
        <Line 
          type="monotone" // Smooth curve line
          dataKey="total" // Data key for y-values
          stroke="#8884d8" // Line color
          activeDot={{ r: 8 }} // Highlight point when hovered
          name="Daily Expenses" // Legend label
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseTrendChart;
