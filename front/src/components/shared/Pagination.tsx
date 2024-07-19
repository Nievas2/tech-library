// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5; // Número máximo de páginas visibles
//     const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           className={`px-3 py-1 rounded-md cursor-pointer ${
//             i === currentPage
//               ? "bg-primary text-light dark:bg-light dark:text-main"
//               : "hover:bg-main/15 dark:hover:bg-light/15"
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </li>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
//         onClick={() => handlePageChange(1)}
//         disabled={currentPage === 1}
//       >
//         First
//       </button>
//       <button
//         className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>
//       <ul className="flex gap-2 font-semibold">{renderPageNumbers()}</ul>
//       <button
//         className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//       <button
//         className="px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
//         onClick={() => handlePageChange(totalPages)}
//         disabled={currentPage === totalPages}
//       >
//         Last
//       </button>
//     </div>
//   );
// };


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
          className={`px-[9px] py-1 sm:px-3 sm:py-1 text-sm sm:text-base rounded-md cursor-pointer ${
            i === currentPage
              ? "bg-main text-light"
              : "hover:bg-[#F9D8DF] dark:hover:bg-[#311421]"
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
        className="hidden sm:block px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:transition-all disabled:duration-[300ms] disabled:bg-black transition duration-[300ms] disableStyles w-8 h-8 xs:w-9 xs:h-9 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon icon="iconamoon:arrow-left-2-duotone" className='text-xl xl:text-xl' />
      </button>

      <ul className="flex gap-2 font-semibold">
        {renderPageNumbers()}
      </ul>

      <button
        className='text-dark dark:text-light border border-dark dark:border-light rounded-full p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 disabled:transition-all disabled:duration-[300ms] disabled:bg-black transition duration-[300ms] disableStyles w-8 h-8 xs:w-9 xs:h-9 xl:w-10 xl:h-10 flex items-center justify-center'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon icon="iconamoon:arrow-right-2-duotone" className='text-xl xl:text-xl' />
      </button>

      <button
        className="hidden sm:block px-3 py-1 rounded-md hover:bg-main/15 dark:hover:bg-light/15 font-semibold"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};