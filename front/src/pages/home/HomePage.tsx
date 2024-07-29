import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react"
import { Library } from "@/interfaces/Library"
import { Pagination } from "@/components/shared/Pagination"
import usePaginationHome from "@/hooks/usePaginationHome"
import { getLibrariesSearch } from "@/services/LibraryService"
import { useTagStore } from "@/stores"
import { useAuthContext } from "@/contexts"
import NotFound from "@/components/shared/NotFound"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { renderSkeletonHome } from "./skeletons/SkeletonHome"
import { Skeleton } from "@/components/ui/skeleton"

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [totalLibraries, setTotalLibraries] = useState<number>();
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();
  const [notFound, setNotFound] = useState(false);
  const [morePopular, setMorePopular] = useState(false);
  const tagsActives = useTagStore((state) => state.tagsActives);
  const tags = useTagStore((state) => state.tags);
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    searchParams,
    setCurrentPage
  } = usePaginationHome();
  const search = String(searchParams.get("search"));
  const searchParamsData = searchParams.get("search");
  const [open, setOpen] = useState(window.innerWidth >= 1024);

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
        const { libraries, totalPages, totalLibraries } = librariesResponse

        setLibraries(libraries)
        setTotalPages(totalPages)
        setTotalLibraries(totalLibraries)
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

  return (
    <>
      <section className="flex flex-row min-h-full">
        <div className="flex flex-1">
          <SideBar open={open} setOpen={setOpen} />
        </div>

        <div className="py-7 px-4 flex flex-col items-center gap-7 justify-start">
          <div className="flex flex-col gap-3 justify-center">
            <SearchBar />

            <div className="flex justify-between items-center gap-2">
              {loading ? (
                <Skeleton className="h-7 w-[140px]" />
              ) : (
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
                  Más populares
                </Button>
              )}
              
              {loading ? (
                <Skeleton className="h-10 w-[100px] cp:h-5 cp:w-[147px]" />
              ) : (
                <p className="text-main text-sm text-center cp:text-right">({totalLibraries}) <span className="text-dark dark:text-light">total de librerias</span></p>
              )}
            </div>

            {notFound && currentPage === 1 ? (
              <NotFound />
            ) : (
              <div>
                {search ? (
                  <CardsContainer open={open} libraries={libraries} />
                ) : (
                  <div>
                    {loading ? (
                      renderSkeletonHome()
                    ) : (
                      <CardsContainer open={open} libraries={libraries} />
                    )}
                  </div>
                )}
              </div>
            )}
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