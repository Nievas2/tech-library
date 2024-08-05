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
import FormAddLibrary from "@/components/shared/FormAddLibrary"
import StateCard from "./components/StateCard"
import { useEffect, useState } from "react"
import {
  getLibrariesByStateUser,
  getLibrariesUserDashboard
} from "@/services/LibraryService"
import { Library } from "@/interfaces/Library"
import { useAuthContext } from "@/contexts"
import usePagination from "@/hooks/usePagination"
import { Pagination } from "@/components/shared/Pagination"
import { renderSkeletonsUserDashboard } from "./skeletons/SkeletonUserDashboard"
import { motion } from "framer-motion";

const UserDashboardPage = () => {
  const { authUser } = useAuthContext()
  const [list, setList] = useState<Library[]>()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState("all")
  const [filterError, setFilterError] = useState<string>()
  const [disabled, setDisabled] = useState(false)
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    setCurrentPage
  } = usePagination()

  async function getLibrary() {
    setDisabled(true)
    try {
      const response = await getLibrariesUserDashboard(
        authUser!.user.id,
        currentPage
      )
      setFilterError("")
      setList(response.results)
      setTotalPages(Math.ceil(response.total_pages))
    } catch (error) {
      setFilterError("Aún no has sugerido librerias...")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLibrary()
  }, [currentPage])

  useEffect(() => {
    setLoading(true)
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
    try {
      const response = await getLibrariesByStateUser(
        state.toLocaleLowerCase(),
        currentPage,
        authUser!.user.id
      )

      setList(response.data.results)
      setTotalPages(response.data.total_pages)
      setFilterError("")
    } catch (error) {
      setFilterError("Aún no has sugerido librerias...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      className="flex mx-auto max-w-[1240px] flex-col relative gap-6"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-3xl font-bold py-0 text-center">Panel de usuario</h1>

      <div className="flex justify-between py-2 min-w-[300px] sm:min-w-[608px] md:min-w-[736px] lg:min-w-[992px] xl:min-w-[1240px]">
        <Select
          defaultValue="ALL"
          onValueChange={handleChangeSelect}
        >
          <SelectTrigger
            className={`w-[180px] ${
              state === "all" ? "bg-light text-dark dark:text-light" : ""
            }`}
          >
            <SelectValue placeholder="Select a state" />
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

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="text-light font-medium bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] py-2 px-4 rounded-md transition-colors duration-150">
              Sugerir
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sugerir</DialogTitle>
              </DialogHeader>

              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex justify-center">
        {loading ? (
          renderSkeletonsUserDashboard()
        ) : (
          <>
            {filterError ? (
              <div className="h-[40vh] flex text-center items-center justify-center">
                <span className=" text-2xl font-bold">{filterError}</span>
              </div>
            ) : (
              <section className="flex flex-col gap-6">
                <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
                  {list?.map((card) => (
                    <StateCard
                      key={crypto.randomUUID()}
                      card={card}
                    />
                  ))}
                </section>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage!}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    disabled={disabled}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default UserDashboardPage
