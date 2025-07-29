// Updated TransactionForm.js with receipt upload integration
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createTransaction, updateTransaction } from "../../api/transactions";
import ReceiptUploader from './ReceiptUploader';

const TransactionForm = ({ transaction, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description || "",
        date: new Date(transaction.date).toISOString().split("T")[0],
      });
    }
  }, [transaction]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTypeChange = (type) => setFormData({ ...formData, type });

  // Handle receipt extraction data
  const handleReceiptData = (data) => {
    setFormData({
      ...formData,
      amount: data.amount,
      category: data.category || formData.category,
      description: data.description || formData.description,
      date: data.date.split('T')[0] || formData.date,
      type: data.type || formData.type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiCall = transaction
      ? () => updateTransaction(transaction._id, formData)
      : () => createTransaction(formData);

    try {
      await toast.promise(apiCall(), {
        loading: transaction ? "Updating transaction..." : "Adding transaction...",
        success: () => {
          onSuccess();
          if (!transaction) {
            setFormData({
              type: "expense",
              amount: "",
              category: "",
              description: "",
              date: new Date().toISOString().split("T")[0],
            });
          }
          return (
            <b>
              {transaction
                ? "Transaction updated successfully!"
                : "Transaction added successfully!"}
            </b>
          );
        },
        error: (err) => (
          <b>
            {err.response?.data?.message ||
              (transaction
                ? "Failed to update transaction."
                : "Failed to add transaction.")}
          </b>
        ),
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Receipt Upload Section */}
      {!transaction && (
        <ReceiptUploader onDataExtracted={handleReceiptData} />
      )}

      {/* Transaction Type Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => handleTypeChange("income")}
            className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
              formData.type === "income"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("expense")}
            className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
              formData.type === "expense"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
          className={inputStyle}
          placeholder="0.00"
        />
      </div>

      {/* Category Input */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={inputStyle}
          placeholder="e.g., Groceries, Salary"
        />
      </div>

      {/* Date Picker */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={inputStyle}
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={inputStyle}
          rows="3"
          placeholder="A brief note..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {transaction && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-800 font-bold px-4 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            transaction && onCancel ? "flex-1" : "w-full"
          } flex justify-center items-center bg-gray-800 text-white font-bold px-4 py-3 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors hover:cursor-pointer`}
        >
          {isSubmitting
            ? transaction
              ? "Updating..."
              : "Adding..."
            : transaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;