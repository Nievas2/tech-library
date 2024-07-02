import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = useCallback((page: any) => {
    setCurrentPage(page);
    updateUrl(page);
  }, []);

  const updateUrl = useCallback((page: any) => {
    setSearchParams({ currentPage: page.toString() });
  }, [setSearchParams]);

  const getInitialPage = useCallback(() => {
    const pageFromUrl = Number(searchParams.get('currentPage')) || 1;
    setCurrentPage(pageFromUrl);
    return pageFromUrl;
  }, [searchParams]);

  return {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    getInitialPage,
  };
};

export default usePagination;