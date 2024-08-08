import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Library } from "@/interfaces/Library"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import ChangeTag from "./components/ChangeTag"
import StateCardAdmin from "./components/StateCardAdmin"
import FormAddLibrary from "../../components/shared/FormAddLibrary"
import { getLibrariesByStateAdmin } from "@/services/LibraryService"
import { Button } from "@/components/ui/button"
import { getTagsApi } from "@/services/TagService"
import { Tag } from "@/interfaces/Tag"
import { Pagination } from "@/components/shared/Pagination"
import usePagination from "@/hooks/usePagination"
import { renderSkeletonsAdminDashboard } from "./skeletons/SkeletonAdminDashboard"
import { motion } from "framer-motion";

const AdminDashboardPage = () => {
  const [list, setList] = useState<Library[]>()
  const [showTags, setShowTags] = useState(true)
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState("all")
  const [disabled, setDisabled] = useState(false)
  const [filterError, setFilterError] = useState<string>("")
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    setCurrentPage
  } = usePagination()

  const fetchTags = async () => {
    try {
      const tags = await getTagsApi()
      setTags(tags)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchTags()
    handlePageChange(1)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [state])

  useEffect(() => {
    fethLibraries(state)
  }, [currentPage, state])

  function handleChangeSelect(value: string) {
    setState(value.toLocaleLowerCase())
  }

  async function fethLibraries(state: string) {
    setDisabled(true)
    
    try {
      const response = await getLibrariesByStateAdmin(
        state.toLocaleLowerCase(),
        currentPage
      )

      setFilterError("")
      setList(response.data.results)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      setFilterError("No se encontraron librerias con este estado.")
    }finally {
      setDisabled(false)
    }
    
    if (list) setLoading(false)
  }

  return (
    <motion.div 
      className="flex flex-col mx-auto max-w-[1240px] relative gap-6"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-3xl font-bold text-center">Panel administrativo</h1>

      <div className="flex justify-between py-2 min-w-[300px] sm:min-w-[608px] md:min-w-[736px] lg:min-w-[992px] xl:min-w-[1240px]">
        <div className="flex flex-1 flex-col md:flex-row gap-4 justify-center items-center">
          <Select
            defaultValue="ALL"
            onValueChange={handleChangeSelect}
          >
            <SelectTrigger className="w-[180px] md:w-[257.35px]">
              <SelectValue placeholder="Elegir un estado" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup className="flex flex-col gap-1">
                <SelectItem
                  value="ALL"
                  className={`${
                    state.toLocaleUpperCase() === "ALL"
                      ? "bg-main text-light pointer-events-none"
                      : "bg-white text-dark dark:text-light"
                  }`}
                >
                  TODOS
                </SelectItem>

                <SelectItem
                  value="ACTIVE"
                  className={`${
                    state.toLocaleUpperCase() === "ACTIVE"
                      ? "bg-main text-light pointer-events-none"
                      : "bg-white text-dark dark:text-light"
                  }`}
                >
                  ACTIVOS
                </SelectItem>

                <SelectItem
                  value="PENDING"
                  className={`${
                    state.toLocaleUpperCase() === "PENDING"
                      ? "bg-main text-light pointer-events-none"
                      : "bg-white text-dark dark:text-light"
                  }`}
                >
                  PENDIENTES
                </SelectItem>

                <SelectItem
                  value="INACTIVE"
                  className={`${
                    state.toLocaleUpperCase() === "INACTIVE"
                      ? "bg-main text-light pointer-events-none"
                      : "bg-white text-dark dark:text-light"
                  }`}
                >
                  INACTIVOS
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div>
            <Dialog>
              <DialogTrigger className="text-light font-medium bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] py-2 px-4 rounded-md transition-colors duration-150 flex flex-row items-center gap-1 truncate">
                <Icon
                  icon="material-symbols:add"
                  width="18"
                  height="18"
                />
                Agregar categoria
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar categoria</DialogTitle>
                </DialogHeader>
                <ChangeTag tag={undefined} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-row md:flex-row-reverse gap-4 justify-center w-full md:justify-between md:gap-0">
            <Dialog>
              <DialogTrigger className="text-light font-medium bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] py-2 px-4 rounded-md transition-colors duration-150 flex flex-row items-center gap-1">
                <Icon
                  icon="material-symbols:add"
                  width="18"
                  height="18"
                />
                Agregar libreria
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar libreria</DialogTitle>
                </DialogHeader>

                <FormAddLibrary card={undefined} />
              </DialogContent>
            </Dialog>

            <Button
              className={`${showTags ? "bg-dark hover:bg-dark/80 dark:bg-light dark:hover:bg-light/90" : "bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D]"} `}
              onClick={() => setShowTags(!showTags)}
              id="show-tags"
              aria-label="Show tags"
              role="button"
              variant="popular"
            >
              <Icon
                icon="mdi:tag-outline"
                width="20"
                height="20"
                className={`${showTags ? "text-light dark:text-dark" : "text-light dark:text-light"} `}
              />
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        renderSkeletonsAdminDashboard()
      ) : (
        <>
          {filterError ? (
            <div className="h-[40vh] flex text-center items-center justify-center">
              <span className=" text-2xl font-bold">{filterError}</span>
            </div>
          ) : (
            <section className="flex flex-col gap-6">
              <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
                {list &&
                  list?.map((card) => (
                    <StateCardAdmin
                      key={crypto.randomUUID()}
                      card={card}
                    />
                  ))}
              </section>

              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={disabled}
                />
              </div>
            </section>
          )}

          {showTags && (
            <section className="mx-auto max-w-[1240px] justify-center gap-5 flex flex-wrap">
              {tags?.map((tag: any) => (
                <div key={crypto.randomUUID()}>
                  <Dialog>
                    <DialogTrigger className="px-4 py-1 rounded-md border border-main flex">
                      {tag.name}
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Actualizar tag</DialogTitle>
                      </DialogHeader>
                      
                      <ChangeTag tag={tag} />
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </motion.div>
  )
}

export default AdminDashboardPage