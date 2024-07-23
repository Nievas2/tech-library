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
    } catch (error) {
      console.error("Error fetching tags", error)
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
    try {
      const response = await getLibrariesByStateAdmin(
        state.toLocaleLowerCase(),
        currentPage
      )
      
      setFilterError("")
      setList(response.data.results)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      setFilterError("No libraries were found with that status")
    }
    if (list) setLoading(false)
  }

  return (
    <div className="flex flex-1 flex-col relative max-w-[1240px] gap-6">
      <h1 className="text-3xl font-bold text-center">Admin dashboard</h1>
      
      <div className="flex flex-wrap py-2 gap-1">
        <div className="flex flex-1 gap-4 flex-wrap">
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
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex items-center">
              <Icon
                icon="material-symbols:add"
                width="16"
                height="16"
              />
              Add Tag
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Add tag
                </DialogTitle>
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
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex">
              Add Library
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Add Library
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
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
                        <DialogTitle>
                          Update Tag
                        </DialogTitle>
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
