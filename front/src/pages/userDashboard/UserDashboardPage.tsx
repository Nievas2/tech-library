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
import { useToast } from "@/components/ui/use-toast"

const UserDashboardPage = () => {
  const { authUser } = useAuthContext()
  const { toast } = useToast()
  const [list, setList] = useState<Library[]>()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState("all")
  const {
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    setCurrentPage
  } = usePagination()

  async function getLibrary() {
    const response = await getLibrariesUserDashboard(
      authUser!.user.id,
      currentPage
    )

    setList(response.results)
    setTotalPages(Math.ceil(response.total_pages))
  }

  useEffect(() => {
    getLibrary()
  }, [currentPage])

  useEffect(() => {
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
    setLoading(true)
    try {
      const response = await getLibrariesByStateUser(
        state.toLocaleLowerCase(),
        currentPage,
        authUser!.user.id
      )

      setList(response.data.results)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      toast({
        title: "Dont have libraries with this state"
      })
      throw error
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-1 mx-auto max-w-[1240px] w-screen flex-col relative gap-6 pt-0 p-4 md:pt-0 sm:p-4 sm:pt-0 xl:p-0">
      <div className="flex">
        <div className="flex-1">
          <Select
            defaultValue="ALL"
            onValueChange={handleChangeSelect}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex">
              Sugerir
            </DialogTrigger>
            <DialogContent className="bg-[#F9D8DF] dark:bg-[#311421]">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Sugerir
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <span className="text-center text-2xl font-bold">Loading...</span>
      ) : (
        <>
          <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
            {list?.map((card) => (
              <StateCard
                key={crypto.randomUUID()}
                card={card}
              />
            ))}
          </section>
          <div className="flex justify-center pb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserDashboardPage
