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
    <div className="flex flex-1 flex-col relative max-w-[1240px] gap-6">
      <h1 className="text-3xl font-bold text-center">Panel administrativo</h1>

      <div className="flex flex-wrap py-2 gap-1">
        <div className="flex flex-1 gap-4 flex-wrap">
          <Select
            defaultValue="ALL"
            onValueChange={handleChangeSelect}
          >
            <SelectTrigger className="w-[180px]">
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
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex items-center">
              <Icon
                icon="material-symbols:add"
                width="16"
                height="16"
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
          <Button
            className={`${showTags ? "bg-main dark:text-white" : ""} `}
            onClick={() => setShowTags(!showTags)}
            id="show-tags"
            aria-label="Show tags"
            role="button"
          >
            <Icon
              icon="mdi:tag-outline"
              width="20"
              height="20"
              color={`${showTags ? "white" : ""} `}
            />
          </Button>
        </div>

        <div className="flex justify-end">
          <div>
             <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex">
              Agregar libreria
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar libreria</DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
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
            <>
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
            </>
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
    </div>
  )
}

export default AdminDashboardPage
