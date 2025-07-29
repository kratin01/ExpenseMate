// Utility function to format a number into Indian Rupee format
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',     // Show as currency
    currency: 'INR',       // Indian Rupee
    minimumFractionDigits: 2 // Always show 2 decimal places
  }).format(amount);
};

// Utility function to format a date into "DD Mon YYYY" format
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // Example: "2025-07-28" → "28 Jul 2025"
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Utility function to shorten text if it’s too long
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text; // Return as is if short enough
  return text.substring(0, maxLength) + '...'; // Add ellipsis if truncated
};
