import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react"
import { Library } from "@/interfaces/Library"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "@/components/shared/Pagination"
import usePaginationHome from "@/hooks/usePaginationHome"
import {
  getLibraries,
  getLibrariesFilter,
  getLibrariesSearch
} from "@/services/LibraryService"
import { useTagStore } from "@/stores"
import { useAuthContext } from "@/contexts"
import NotFound from "@/components/shared/NotFound"

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthContext()
  const [notFound, setNotFound] = useState(false)
  const tagsActives = useTagStore((state) => state.tagsActives)
  const tags = useTagStore((state) => state.tags)
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    searchParams,
    setCurrentPage
  } = usePaginationHome()
  const search = String(searchParams.get("search"))
  const searchParamsData = searchParams.get("search")

  useEffect(() => {
    setCurrentPage(1)
  }, [tagsActives, totalPages, searchParamsData, search])

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const tagsIds = String(urlParams.get("tags"))
        const tagsIdsParams = String(searchParams.get("tags"))

        let librariesResponse
        if (search == "null" && searchParamsData == null) {
          //No hay search y hay tags
          if (tagsIds.length >= 1 || tagsIdsParams.length >= 1) {
            librariesResponse = await getLibrariesFilter(
              currentPage || 1,
              1,
              tagsIds ? tagsIds : tagsIdsParams ? tagsIdsParams : undefined
            )
          } else {
            //No hay search y no hay tags
            librariesResponse = await getLibraries(
              currentPage || 1,
              authUser!.user.id
            )
          }
        } else {
          // Hay search
          librariesResponse = await getLibrariesSearch(
            currentPage || 1,
            1,
            tagsIds ? tagsIds : tagsIdsParams ? tagsIdsParams : undefined,
            search ? search : searchParamsData ? searchParamsData : ""
          )
        }

        const { libraries, totalPages } = librariesResponse
        setLibraries(libraries)
        setTotalPages(totalPages)
        setLoading(false)
        setNotFound(false)
      } catch (err) {
        console.error("Error fetching libraries:", err)
        if (currentPage !== undefined && totalPages > currentPage) {
          setCurrentPage(1)
        }
        if (currentPage === 1) {
          setNotFound(true)
        }
        setTotalPages(1)

        setLoading(false)
      }
    }

    fetchLibraries()
  }, [setTotalPages, tags, search, currentPage])

  useEffect(() => {
    handlePageChange(1)
  }, [tagsActives, totalPages])

  const SkeletonCard = () => {
    return (
      <div className="flex w-[300px] md:w-[250px] h-[250px] bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full sm:w-3/4 rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <div className="flex flex-row flex-wrap gap-2 text-sm">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-6 w-12 rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-start items-center">
            <Skeleton className="h-10 w-full sm:w-3/4 rounded-md" />
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-8 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  const renderSkeletons = () => {
    return (
      <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mb-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <>
      <section className="flex flex-row min-h-full">
        <div className="flex flex-1">
          <SideBar />
        </div>
        <div className="pt-7 flex flex-col items-center gap-7 px-1 sm:px-4 justify-start mb-7">
          <div className="flex flex-col items-end md:items-center gap-7">
            <SearchBar />
            <>
              {notFound && currentPage === 1 ? (
                <NotFound />
              ) : (
                <div>
                  {search ? (
                    <CardsContainer libraries={libraries} />
                  ) : (
                    <div>
                      {loading ? (
                        renderSkeletons()
                      ) : (
                        <CardsContainer libraries={libraries} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          </div>

          <Pagination
            currentPage={currentPage!}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  )
}

export default HomePage
