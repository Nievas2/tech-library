import { useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"

// Reutilizable para otros componentes
const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = useCallback((page: any) => {
    setCurrentPage(page)
    updateUrl(page)
  }, [])

  const handleSearch = useCallback((search: any) => {
    updateSearchUrl(search, 1)
  }, [])

  const updateSearchUrl = useCallback(
    (search: any, page: any) => {
      setSearchParams({ currentPage: page.toString(), search: search })
    },
    [setSearchParams]
  )

  const updateUrl = useCallback(
    (page: any) => {
      const urlParams = new URLSearchParams(window.location.search)
      const search = urlParams.get("search") || ""
      setSearchParams({ currentPage: page.toString(), search: search })
    },
    [setSearchParams]
  )

  const getInitialPage = useCallback(() => {
    const pageFromUrl = Number(searchParams.get("currentPage")) || 1
    setCurrentPage(pageFromUrl)
    return pageFromUrl
  }, [searchParams])

  return {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    getInitialPage,
    handleSearch,
    searchParams
  }
}

export default usePagination
