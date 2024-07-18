import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getTagsApi } from "@/services/TagService"
import { Tag, useTagStore } from "@/stores"
import usePaginationHome from "@/hooks/usePaginationHome"

export default function SideBar() {
  const [open, setOpen] = useState(window.innerWidth > 768)
  const setTags = useTagStore((state) => state.setTags)
  const tags = useTagStore((state) => state.tags)
  const [loading, setLoading] = useState(true)
  const { searchParams } = usePaginationHome()

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const fetchTags = async () => {
      try {
        const response = await getTagsApi()
        const tagsIdsParams = String(searchParams.get("tags"))
        const ids = tagsIdsParams.split(",").map(Number)
        const updatedObjectsArray = response.map((obj) => {
          return {
            ...obj,
            selected: ids.includes(Number(obj.id))
          }
        })
        setTags(updatedObjectsArray)
      } catch (error) {
        console.error("Error fetching tags", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  const handleSidebar = () => {
    setOpen(!open)
  }

  return (
    <section
      className={`min-h-full transition-width duration-300 ease-out fixed z-10 md:static border-l-[1px] border-r-[1px] border-dark dark:border-light bg-[#F9D8DF] dark:bg-[#311421] ${
        open ? "w-60" : "w-0 border-none"
      } `}
    >
      <div
        className="w-full h-full relative"
      >
        <div
          className={`absolute duration-150 z-50 ${
            open ? "right-[-18px]" : "right-[-52px] xl:right-[-50px]"
          } top-[30px]`}
        >
          <Button
            onClick={handleSidebar}
            variant="sidebarToggle"
            size="rounded"
          >
            <Icon
              icon="mingcute:right-fill"
              width="36"
              height="36"
              color="#f72585"
              className={`duration-500 ${open ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      
        <div
          className={`w-full h-screen sticky top-[97px] ${
            open ? "px-4 pt-[34px] pb-4" : "pt-0"
          }`}
        >
          <div className={`${open ? "flex flex-col gap-4 text-dark dark:text-light" : "hidden"}`}>
            <h2 className="text-xl font-bold">CATEGORIES</h2>
            <ul className="flex flex-col gap-1 overflow-y-scroll scroll-smooth h-[320px]">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {tags &&
                    tags?.map((tag: Tag) => (
                      <ItemsSideBar
                        key={tag.name}
                        tag={tag}
                      />
                    ))}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
