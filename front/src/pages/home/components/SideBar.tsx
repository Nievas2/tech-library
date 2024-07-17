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

  // Forma optima de traer las tags
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
      className={`min-h-full transition-width duration-300 ease-out fixed z-10 md:static border-l-[1px] border-r-[1px] border-dark dark:border-light bg-[#311421] md:dark:bg-main/15  ${
        open ? "w-60" : "w-0 border-none"
      } `}
    >
      <div
        className={`fixed top-30 duration-150 ${
          open ? "left-[225px] xl:left-[250px]" : "left-[0px]"
        } top-[125px]`}
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
        className={`w-full h-screen sticky top-[97px] overflow-y-scroll scroll-smooth p-2 ${
          open ? "px-4 pt-[34px]" : "pt-0"
        }`}
        style={{
          scrollbarWidth: "none"
        }}
      >
        <div className={`${open ? "flex flex-col gap-4" : "hidden"} `}>
          <h2 className="text-xl font-bold text-[#fff]">CATEGORIES</h2>
          <ul className="flex flex-col gap-1">
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
    </section>
  )
}
