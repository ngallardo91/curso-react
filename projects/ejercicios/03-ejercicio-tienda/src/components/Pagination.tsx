type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-end py-6">
      <div className="pagination-buttons flex justify-center items-center">
        <button
          className={`mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 font-bold 
            ${currentPage  === 1 ? 'opacity-50 cursor-not-allowed cursor-not-allowed' : ''}
          `}
          onClick={() => handlePageChange(currentPage  - 1)}
        >
          ◁
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded ${currentPage  === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 font-bold 
            ${currentPage  === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => handlePageChange(currentPage  + 1)}
        >
          ▷
        </button>
      </div>
    </div>
  );
}

export default Pagination;