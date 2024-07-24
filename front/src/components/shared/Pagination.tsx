import React from "react";
import { Icon } from '@iconify/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
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
        <li
          key={i}
          className={`px-[10px] py-2 sm:px-3 sm:py-1 text-base sm:text-lg rounded-md cursor-pointer ${
            i === currentPage
              ? "bg-main text-light"
              : "hover:bg-[#F84F9A] hover:text-light hover:dark:bg-[#C9216D]"
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
        className="hidden sm:block px-3 py-1 rounded-md cursor-pointer hover:bg-main hover:text-light font-semibold transition-colors duration-150 border border-dark dark:border-light"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        Primero
      </button>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:bg-black transition duration-150 disableStyles w-11 h-11 xs:w-9 xs:h-9 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon icon="iconamoon:arrow-left-2-duotone" className='text-xl xl:text-xl' />
      </button>

      <ul className="flex gap-2 font-semibold">
        {renderPageNumbers()}
      </ul>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:bg-black transition duration-150 disableStyles w-11 h-11 xs:w-9 xs:h-9 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon icon="iconamoon:arrow-right-2-duotone" className='text-xl xl:text-xl' />
      </button>

      <button
        className="hidden sm:block px-3 py-1 rounded-md cursor-pointer hover:bg-main hover:text-light font-semibold transition-colors duration-150 border border-dark dark:border-light"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Último
      </button>
    </div>
  );
};