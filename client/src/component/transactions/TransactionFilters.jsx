// src/component/transactions/TransactionFilters.js
// This component provides filters (date range, type, pagination) for the transactions table.
// It updates filter state in the parent component and supports resetting all filters.

const TransactionFilters = ({ filters, setFilters }) => {
  // Handle changes in filter inputs
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1 // Reset to first page whenever filter changes
    });
  };
  
  // Reset all filters to default values
  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      type: '',
      page: 1,
      limit: 10
    });
  };

  // Common styles for form elements
  const inputStyle =
    "w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition text-sm";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
      {/* Filters arranged in responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        
        {/* Start Date Filter */}
        <div>
          <label htmlFor="startDate" className={labelStyle}>Start Date</label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        
        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className={labelStyle}>End Date</label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        
        {/* Type Filter (Income / Expense) */}
        <div>
          <label htmlFor="type" className={labelStyle}>Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        {/* Limit Filter (Items per page) */}
        <div>
          <label htmlFor="limit" className={labelStyle}>Per page</label>
          <select
            id="limit"
            name="limit"
            value={filters.limit}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        
        {/* Reset Button */}
        <div className="sm:col-span-2 md:col-span-1 hover:">
          <button
            onClick={handleReset}
            className="w-full p-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm hover:cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionFilters;
