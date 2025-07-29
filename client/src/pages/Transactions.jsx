// src/pages/Transactions.js
import { useState, useEffect } from "react";
import { getTransactions, getOverallSummary, deleteTransaction } from "../api/transactions";
import toast from "react-hot-toast";
import TransactionSummary from "../component/transactions/TransactionSummary";
import TransactionForm from "../component/transactions/TransactionForm";
import TransactionList from "../component/transactions/TransactionList";
import TransactionFilters from "../component/transactions/TransactionFilters";
import TransactionListSkeleton from "../component/transactions/TransactionListSkeleton";
import DeleteConfirmationToast from "../component/transactions/DeleteConfirmationToast";
import PaginationControls from "../component/transactions/PaginationControls";
import PageHeader from "../component/transactions/PageHeader";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { ...filters };

      if (params.startDate) params.startDate = new Date(params.startDate).toISOString();
      if (params.endDate) params.endDate = new Date(params.endDate).toISOString();

      const [transactionsResponse, summaryResponse] = await Promise.all([
        getTransactions(params),
        getOverallSummary({ startDate: params.startDate, endDate: params.endDate }),
      ]);

      setTransactions(transactionsResponse.data.transactions);
      setPagination({
        currentPage: transactionsResponse.data.currentPage,
        totalPages: transactionsResponse.data.totalPages,
      });
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error("Failed to load transaction data", error);
      toast.error("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({ ...filters, page: newPage });
    }
  };

  const handleSuccess = () => {
    fetchData();
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    document.getElementById("transaction-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (transaction) => {
    toast.custom(
      (t) => (
        <DeleteConfirmationToast 
          transaction={transaction} 
          onCancel={() => toast.dismiss(t.id)}
          onConfirm={async () => {
            toast.dismiss(t.id);
            try {
              await deleteTransaction(transaction._id);
              toast.success("Transaction deleted successfully!");
              fetchData();
            } catch (error) {
              toast.error(error.response?.data?.message || "Failed to delete transaction.");
            }
          }}
        />
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    toast("Edit cancelled", { icon: "ℹ️" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="Transactions" 
          description="Manage your income and expenses all in one place." 
        />

        <TransactionSummary summary={summary} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1 mb-8 lg:mb-0" id="transaction-form-section">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <TransactionForm
                key={editingTransaction ? editingTransaction._id : "add-mode"}
                transaction={editingTransaction}
                onSuccess={handleSuccess}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <TransactionFilters filters={filters} setFilters={setFilters} />

            {loading ? (
              <TransactionListSkeleton />
            ) : (
              <>
                <TransactionList
                  transactions={transactions}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                {pagination.totalPages > 1 && (
                  <PaginationControls 
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPrevious={() => handlePageChange(pagination.currentPage - 1)}
                    onNext={() => handlePageChange(pagination.currentPage + 1)}
                    isFirstPage={pagination.currentPage === 1}
                    isLastPage={pagination.currentPage === pagination.totalPages}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;