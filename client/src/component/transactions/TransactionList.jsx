// src/component/transactions/TransactionList.js
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No transactions found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters or add a new transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Mobile View */}
      <div className="lg:hidden">
        <ul className="divide-y divide-gray-200">
          {transactions.map((t) => (
            <li key={t._id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">{t.category}</span>
                <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{t.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {format(new Date(t.date), 'MMM dd, yyyy')}
              </p>
              
              {/* Action Buttons - Mobile */}
              <div className="mt-3 flex justify-end space-x-2">
                <button 
                  onClick={() => onEdit(t)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(t)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{t.category}</div>
                  <div className="text-sm text-gray-500">{t.description || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${t.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="ml-2 text-sm text-gray-800 capitalize">{t.type}</div>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    {format(new Date(t.date), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                
                {/* Action Buttons - Desktop */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => onEdit(t)}
                      className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(t)}
                      className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;