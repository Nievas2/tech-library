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
import { getAllLibraries } from "@/services/LibraryService"
import { Button } from "@/components/ui/button"
import { getTagsApi } from "@/services/TagService"
import { Tag } from "@/interfaces/Tag"
import { Pagination } from "@/components/shared/Pagination"
import usePagination from "@/hooks/usePagination"

const AdminDashboardPage = () => {
  const [list, setList] = useState<Library[]>()
  const [showTags, setShowTags] = useState(true)
  const [defaultList, setDefaultList] = useState<Library[]>()
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const { currentPage, totalPages, setTotalPages, handlePageChange } =
    usePagination()
  async function getLibraries() {
    const response = await getAllLibraries(currentPage)
    //console.log(response)

    setList(response.results)
    setDefaultList(response.results)
    setTotalPages(Math.ceil(response.total_pages))
  }
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
    getLibraries()
  }, [currentPage])
  useEffect(() => {
    fetchTags()
    handlePageChange(1)
  }, [])
  function handleChangeSelect(value: string) {
    let cloneList = [...(defaultList || [])]

    if (value === "ALL") {
      setList(defaultList)
      handlePageChange(1)
      return
    }

    cloneList.sort((a, b) => {
      if (a.state === value) return -1
      if (b.state === value) return 1
      return 0
    })

    setList(cloneList)
    handlePageChange(1)
  }

  return (
    <div className="flex flex-1 w-screen flex-col relative max-w-[1240px] gap-4 p-4 xl:p-0">
      <div className="flex flex-wrap py-2 gap-1">
        <div className="flex flex-1 gap-4 flex-wrap">
          <Select
            defaultValue="ALL"
            onValueChange={(value) => handleChangeSelect(value)}
            disabled={loading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">All</SelectItem>
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
            <DialogContent className="bg-light dark:bg-dark ">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Add tag
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <ChangeTag tag={undefined} />
            </DialogContent>
          </Dialog>
          <Button
            className={`${showTags ? "bg-main dark:text-white" : ""} `}
            onClick={() => setShowTags(!showTags)}
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
            <DialogContent className="bg-light dark:bg-dark ">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Add Library
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mt-2">
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
      {showTags && (
        <section className="mx-auto max-w-[1240px] justify-center gap-5 mt-2 flex flex-wrap flex-1 pb-4">
          {tags?.map((tag: any) => (
            <div key={crypto.randomUUID()}>
              <Dialog>
                <DialogTrigger className="px-4 py-1 rounded-md border border-main flex">
                  {tag.name}
                </DialogTrigger>
                <DialogContent className="bg-light dark:bg-dark ">
                  <DialogHeader className="">
                    <DialogTitle>
                      <strong className="text-dark dark:text-light ">
                        Update Tag
                      </strong>
                    </DialogTitle>
                  </DialogHeader>
                  <ChangeTag tag={tag} />
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default AdminDashboardPage
