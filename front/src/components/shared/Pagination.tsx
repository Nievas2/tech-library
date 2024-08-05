import React from "react";
import { Icon } from '@iconify/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={crypto.randomUUID()}
          className={`rounded-md text-sm px-3 py-1.5 sm:text-base sm:px-3 sm:py-1 ${
            i === currentPage
              ? "bg-main text-light cursor-not-allowed"
              : "hover:bg-[#F84F9A] hover:text-light hover:dark:bg-[#C9216D] cursor-pointer"
          }`}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage || disabled}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="hidden sm:block px-3 py-1 rounded-md cursor-pointer hover:bg-main hover:text-light font-semibold transition-colors duration-150 border border-dark dark:border-light"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || disabled}
      >
        Primero
      </button>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:bg-black transition duration-150 disableStyles w98 h-9 cp:w-10 cp:h-10 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        <Icon icon="iconamoon:arrow-left-2-duotone" className='text-xl' />
      </button>

      <ul className="flex gap-2 font-semibold">
        {renderPageNumbers()}
      </ul>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:bg-black transition duration-150 disableStyles w-9 h-9 cp:w-10 cp:h-10 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        <Icon icon="iconamoon:arrow-right-2-duotone" className='text-xl' />
      </button>

      <button
        className="hidden sm:block px-3 py-1 rounded-md cursor-pointer hover:bg-main hover:text-light font-semibold transition-colors duration-150 border border-dark dark:border-light"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || disabled}
      >
        Último
      </button>
    </div>
  );
};