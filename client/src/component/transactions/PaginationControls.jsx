// src/component/transactions/PaginationControls.js

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isFirstPage,
  isLastPage,
}) => (
  <div className="flex items-center justify-between mt-6">
    <button
      onClick={onPrevious}
      disabled={isFirstPage}
      className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Previous
    </button>

    <span className="text-sm text-gray-600 font-medium">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={onNext}
      disabled={isLastPage}
      className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
);

export default PaginationControls;
