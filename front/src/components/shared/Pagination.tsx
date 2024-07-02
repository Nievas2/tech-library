import React from "react";

interface PaginationProps {
  currentPage  : number;
  totalPages   : number;
  onPageChange : (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            i === currentPage
              ? "bg-primary text-light dark:bg-light dark:text-main"
              : "hover:bg-main/15 dark:hover:bg-light/15"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <ul className="flex gap-2 font-semibold">{renderPageNumbers()}</ul>
      <button
        className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};