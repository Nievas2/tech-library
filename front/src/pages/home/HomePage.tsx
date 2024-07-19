import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react"
import { Library } from "@/interfaces/Library"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "@/components/shared/Pagination"
import usePaginationHome from "@/hooks/usePaginationHome"
import { getLibrariesSearch } from "@/services/LibraryService"
import { useTagStore } from "@/stores"
import { useAuthContext } from "@/contexts"
import NotFound from "@/components/shared/NotFound"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthContext()
  const [notFound, setNotFound] = useState(false)
  const [morePopular, setMorePopular] = useState(false)
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
        librariesResponse = await getLibrariesSearch(
          currentPage || 1,
          authUser !== null ? authUser.user.id : "0",
          tagsIds ? tagsIds : tagsIdsParams ? tagsIdsParams : "",
          search !== "null" && search
            ? search
            : searchParamsData !== null && searchParamsData
            ? searchParamsData
            : "",
          morePopular ? "desc" : "asc"
        ) 
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
  }, [setTotalPages, tags, search, currentPage, morePopular])

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

        <div className="pt-7 flex flex-col items-center gap-7 px-4 justify-start mb-7">
          <div className="flex flex-col gap-3 justify-center">
            <SearchBar />

            <>
              <div className="flex flex-1 items-start justify-start">
                <div>
                  <Button
                    variant="popular"
                    size="popularSize"
                    onClick={() => setMorePopular(!morePopular)}
                    id="popular"
                    aria-label="popular"
                    role="button"
                  >
                    <Icon
                      icon="uil:arrow-up"
                      width="24"
                      height="24"
                      className={`${
                        morePopular ? "rotate-180" : ""
                      } transition-transform duration-100`}
                    />
                    More popular
                  </Button>
                </div>
              </div>
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
