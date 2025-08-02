// src/components/charts/CategoryPieChart.js
// This component displays a pie chart of expenses by category using Recharts.
// It dynamically assigns colors and handles cases where no data is available.

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Predefined set of colors for pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CategoryPieChart = ({ data }) => {
  // If there is no data, show a placeholder message
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No expense data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="total"
          nameKey="_id"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount (INR)']} />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
