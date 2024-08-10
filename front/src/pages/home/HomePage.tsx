import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
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
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { renderSkeletonHome } from "./skeletons/SkeletonHome"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [totalLibraries, setTotalLibraries] = useState<number>()
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthContext()
  const [notFound, setNotFound] = useState(false)
  const [morePopular, setMorePopular] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [firstTime, setfirstTime] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const tags = useTagStore((state) => state.tags)
  const disableAllTags = useTagStore((state) => state.disableAllTags)
  const initialLoadTags = useTagStore((state) => state.initialLoadTags)
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    searchParams,
    setCurrentPage
  } = usePaginationHome()
  const searchParamsData = searchParams.get("search")
  const currentPageParams = Number(searchParams.get("currentPage"))
  const tagsIdsParams = String(searchParams.get("tags"))
  const setInitialLoadTags = useTagStore((state) => state.setInitialLoadTags)
  const [open, setOpen] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    if (
      currentPage !== undefined &&
      currentPage > 1 &&
      searchParamsData === null
    ) {
      setCurrentPage(1)
    }
  }, [searchParamsData])

  useEffect(() => {
    setCurrentPage(currentPageParams)
  }, [currentPageParams])

  useEffect(() => {
    if (tagsIdsParams.length === 0) disableAllTags()
  }, [tagsIdsParams])

  useEffect(() => {
    if (initialLoad) setLoading(true)

    const fetchLibraries = async () => {
      try {
        setDisabled(true)
        let librariesResponse
        librariesResponse = await getLibrariesSearch(
          currentPageParams,
          authUser !== null ? authUser.user.id : "0",
          tagsIdsParams ? tagsIdsParams : "",
          searchParamsData !== null ? searchParamsData : "",
          morePopular ? "desc" : "asc"
        )

        const { libraries, totalPages, totalLibraries } = librariesResponse

        setLibraries(libraries)
        setTotalPages(totalPages)
        setTotalLibraries(totalLibraries)
        setLoading(false)




        setNotFound(false)
        setInitialLoadTags(false)
      } catch (err) {
        console.error("Error fetching libraries:", err)
        if (currentPage !== 1 && totalPages > 1) {
          setCurrentPage(1)
        }
        if (currentPage === 1) {
          setNotFound(true)
        }
        setTotalPages(1)
        setLoading(false)
      } finally {
        setDisabled(false)
      }
    }
    if (tags.length > 0) fetchLibraries()
  }, [currentPageParams, tags, morePopular, searchParamsData])

  useEffect(() => {
    // Solo cambiar currentPage si no es la carga inicial
    if (!initialLoad && !initialLoadTags) {
      if (currentPageParams !== 1 || searchParamsData !== null) {
        handlePageChange(1)
      }
    } else {
      // Establecer currentPage desde los parámetros de la URL en la carga inicial
      if (currentPageParams) {
        handlePageChange(currentPageParams)
      }
      setInitialLoad(false) // Marcar que ya se ha completado la carga inicial
    }
  }, [searchParamsData, tags])

  useEffect(() => {
    const firstTimeStorage = localStorage.getItem("firstTime")
    if (firstTimeStorage === null) {
      localStorage.setItem("firstTime", "false")
      setfirstTime(true)
    } else {
      setfirstTime(false)
    }
  }, [])

  return (
    <>
      <motion.section
        className="flex flex-row min-h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-1">
          <SideBar
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div className="py-7 px-4 flex flex-col items-center gap-7 justify-start">
          <div className="flex flex-col gap-3 justify-center">
            <SearchBar />

            <div className="flex justify-between items-center gap-2">
              {notFound ? null : (
                <>
                  {loading ? (
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-row gap-7">
                        <Skeleton className="h-5 w-[140px] my-2" />
                        <Skeleton className="h-5 w-[140px] my-2" />
                      </div>
                      <Skeleton className="h-10 w-[100px] my-2 cp:h-5 cp:w-[147px]" />
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-4">
                        <motion.div 
                          whileTap={{ scale: 1.2 }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <Button
                            variant="popular"
                            size="popularSize"
                            onClick={() => setMorePopular(!morePopular)}
                            id="popular"
                            aria-label="popular"
                            role="button"
                            className="py-2 px-2 hover:underline hover:text-main hover:dark:text-main transition-colors duration-150"
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
                        </motion.div>

                        <Dialog
                          defaultOpen={firstTime}
                          onOpenChange={setfirstTime}
                        >
                          <motion.div 
                            className="flex"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                          >
                            <DialogTrigger 
                              className="text-dark text-sm dark:text-light font-medium py-2 px-2 rounded-md hover:underline hover:text-main hover:dark:text-main transition-colors duration-150"
                            >
                              Sugerir librería
                            </DialogTrigger>
                          </motion.div>

                          <DialogContent>
                            <DialogHeader className="flex flex-col gap-8">
                              <DialogTitle className="text-2xl font-bold leading-none">
                                Sugerir librería {firstTime}
                              </DialogTitle>
                              <div className="flex flex-col gap-2">
                                <span className="text-lg text-left font-semibold">
                                  Te recordamos que podés sugerir librerías para implementar en la web.
                                </span>
                                <p className="text-base text-left">
                                  Ingresá en el siguiente enlace, presiona donde dice "sugerir" y completa los datos.
                                </p>
                                <p className="text-base text-left">
                                  Si tu sugerencia es válida, será aceptada por los administradores.
                                </p>
                              </div>
                              <Link to="/user-dashboard" className="w-full">
                                <Button
                                  variant={"marketing"}
                                  type="button"
                                  className="w-full p-1"
                                >
                                  Ir a mi perfil
                                </Button>
                              </Link>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <motion.p 
                        className="text-main text-sm text-center cp:text-right flex flex-row gap-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        ({totalLibraries}){" "}
                        <div className="text-dark dark:text-light">
                          Total de librerías
                        </div>
                      </motion.p>
                    </>
                  )}
                </>
              )}
            </div>

            {notFound && currentPage === 1 ? (
              <motion.div
                className="flex flex-col gap-2 justify-center text-center w-full  min-h-[400px] sm:min-h-[320px] lg:min-h-[320px] xl:min-h-[350px] px-0 sm:px-24 md:px-36 xl:px-[316px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-3xl text-center font-extrabold">
                  ¡Lo sentimos, no encontramos lo que buscas!
                </p>
                <p className="text-center">
                  No se han encontrado resultados que coincidan con tu búsqueda
                  o filtrado. Por favor, prueba con diferentes términos o ajusta
                  los filtros.
                </p>
              </motion.div>
            ) : (
              <div>
                {loading ? (
                  renderSkeletonHome()
                ) : (
                  <CardsContainer
                    open={open}
                    libraries={libraries}
                  />
                )}
              </div>
            )}
          </div>
          {!notFound && totalPages > 1 && (
            <Pagination
              currentPage={currentPage!}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              disabled={disabled}
            />
          )}
        </div>
      </motion.section>
    </>
  )
}

export default HomePage
