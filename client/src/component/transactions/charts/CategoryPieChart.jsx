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
    // ResponsiveContainer makes the chart adapt to parent size
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {/* Main Pie component */}
        <Pie
          data={data}
          cx="50%" // Center X position
          cy="50%" // Center Y position
          labelLine={false} // Disable default label lines
          outerRadius={80} // Radius of the pie
          fill="#8884d8" // Default fill color (overridden by Cell)
          dataKey="total" // Value field for each slice
          nameKey="_id" // Label field for each slice
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Custom label
        >
          {/* Map through data to assign colors to each slice */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Tooltip shows value on hover */}
        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
        
        {/* Legend displays category names */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
