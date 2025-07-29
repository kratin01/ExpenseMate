// src/component/transactions/TransactionListSkeleton.js
// This component displays a loading skeleton for the transactions list.
// It uses animated gray boxes to mimic the layout of the actual list while data is being fetched.

const TransactionListSkeleton = () => {
  // Skeleton row component (mimics one transaction row)
  const SkeletonRow = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="space-y-2">
        {/* Placeholder for category */}
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        {/* Placeholder for description */}
        <div className="h-3 bg-gray-200 rounded w-40"></div>
      </div>
      {/* Placeholder for amount */}
      <div className="h-5 bg-gray-200 rounded w-20"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Placeholder for table/card header */}
      <div className="p-4 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Multiple skeleton rows to simulate list */}
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </div>
  );
};

export default TransactionListSkeleton;
