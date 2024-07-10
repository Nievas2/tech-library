import { useTagStore } from "@/stores"
import { useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"

// Reutilizable para otros componentes
const usePaginationHome = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  const [totalPages, setTotalPages] = useState(1)
  const tagActives = useTagStore((state) => state.tagsActives)


  const handlePageChange = useCallback((page: any) => {
    setCurrentPage(page)
    updateUrl(page)
  }, [])

  const handleSearch = useCallback((search: any) => {
    updateSearchUrl(search, 1)
  }, [])

  const updateSearchUrl = useCallback(
    (search: any, page: any) => { 
      const tags = tagActives()
      let tagsId = ""
      if (tags.length >= 1) {
        tagsId = tags
          .filter((tag) => tag.id)
          .map((tag) => tag.id)
          .join(",") 
          .toString()
      }
      setSearchParams({ currentPage: page.toString(), search: search, tags: tagsId })
    },
    [setSearchParams]
  )

  const updateUrl = useCallback(
    (page: any) => {
     
      const tags = tagActives()
      let tagsId = ""
      const tagsIdParams = searchParams.get("tags")
      if (tags.length >= 1) {
        tagsId = tags
          .filter((tag) => tag.id)
          .map((tag) => tag.id)
          .join(",")
          .toString()
      }
      const urlParams = new URLSearchParams(window.location.search)
      const search = urlParams.get("search")
      const searchParamsData = searchParams.get("search")      
      setSearchParams({
        currentPage: page.toString(),
        search: search ? search : searchParamsData ? searchParamsData : "",
        tags: tagsId.length > 0 ? tagsId :  tagsIdParams != undefined && tagsIdParams!.length > 0  ? tagsIdParams : ""
      })
    },
    [setSearchParams]
  )
  const sincronizeParams = useCallback(() => {
    const tags = tagActives()
    
    let tagsId = ""
    if (tags.length >= 1) {
      tagsId = tags
        .filter((tag) => tag.id)
        .map((tag) => tag.id)
        .join(",")
        .toString()
    }
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search") || ""
    const current = urlParams.get("currentPage") || ""
    setSearchParams({
      currentPage: current,
      search: search,
      tags: tagsId || ""
    })
  },[])
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
    searchParams,
    sincronizeParams,
    setCurrentPage,
  }
}

export default usePaginationHome