import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react"
import { Library } from "@/interfaces/Library"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "@/components/shared/Pagination"
import usePagination from "@/hooks/usePagination"
import { getLibraries, getLibrariesFilter } from "@/services/LibraryService"
import { useTagStore } from "@/stores"

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState<boolean>(false)
  const tagActives = useTagStore((state) => state.tagActives)
  const tags = useTagStore((state) => state.tags)
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    getInitialPage
  } = usePagination()

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const tags = tagActives()
        if (!search) {
          if (tags.length >= 1) {
            const currentPageFromUrl = getInitialPage()
            const tagsIds = tags.map((tag) => tag.id)
            const { libraries, totalPages } = await getLibrariesFilter(
              currentPageFromUrl,
              1,
              tagsIds.toString()
            )
            setLibraries(libraries)
            setTotalPages(totalPages)
          } else {
            const currentPageFromUrl = getInitialPage()
            const { libraries, totalPages } = await getLibraries(
              currentPageFromUrl,
              1
            )
            setLibraries(libraries)
            setTotalPages(totalPages)
          }
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching libraries:", err)
        setLoading(false)
      }
    }

    fetchLibraries()
  }, [getInitialPage, setTotalPages, tags])

  const SkeletonCard = () => {
    return (
      <div className="flex w-[322.67px] h-[250px] bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
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
          <div className="flex flex-row gap-4 justify-center items-center">
            <Skeleton className="h-10 w-full rounded-md" />
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
        <div className="pt-7 flex flex-col gap-7 px-4 justify-center items-end md:items-center mb-7">
          <SearchBar
            setLibrary={setLibraries}
            setSearch={setSearch}
          />
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

          <div className="">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
