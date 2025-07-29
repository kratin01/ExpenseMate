// src/component/transactions/DeleteConfirmationToast.js

import { formatCurrency } from '../../utils/formatters';

const DeleteConfirmationToast = ({ transaction, onCancel, onConfirm }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-900">
          Delete Transaction
        </h3>
        <p className="mt-1 text-gray-600">
          Are you sure you want to delete this {transaction.type} of{" "}
          {formatCurrency(transaction.amount)}?
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationToast;