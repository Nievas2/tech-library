import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getTagsApi } from "@/services/TagService"
import { Tag, useTagStore } from "@/stores"
import usePaginationHome from "@/hooks/usePaginationHome"
import { Input } from "@/components/ui/input"
import { useDebounce } from "use-debounce"

interface SideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ open, setOpen }: SideBarProps) {
  const setTags = useTagStore((state) => state.setTags)
  const tags = useTagStore((state) => state.tags)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState("")
  const [value] = useDebounce(text, 350)
  const { searchParams } = usePaginationHome()

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 1024)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
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
  useEffect(() => {
    setLoading(true)
    handleChangeSelect(value)
  }, [value])
  function handleChangeSelect(value: string) {
    if (value.length === 0) {
      fetchTags()
    } else {
      const tagsFiltered = tags.filter((tag: Tag) => {
        if (tag.name.toLowerCase().includes(value.toLowerCase())) {
          return tag
        }
      })
      setTags(tagsFiltered)
    }
    setLoading(false)
  }
  const handleSidebar = () => {
    setOpen(!open)
  }

  return (
    <section
      className={`min-h-full transition-width duration-300 ease-out fixed z-10 lg:static border-l-[1px] border-r-[1px] border-dark dark:border-light bg-[#F9D8DF] dark:bg-[#311421] ${
        open ? "w-60" : "w-0 border-none"
      } `}
    >
      <div className="w-full h-full relative">
        <div
          className={`w-full h-screen sticky top-[97px] ${
            open ? "px-4 pt-[34px] pb-4" : "pt-0"
          }`}
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
              id="sidebar-toggle"
              role="button"
              aria-label="Toggle sidebar"
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
            className={`${
              open ? "flex flex-col gap-4 text-dark dark:text-light" : "hidden"
            }`}
          >
            <h2 className="text-xl font-bold">CATEGORIAS</h2>
            <div className="w-full flex h-8 border border-dark dark:border-light rounded-md">
              <div className="w-full relative rounded-md">
                <Input
                  placeholder="Buscar una categoria"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value)
                  }}
                  className="w-full bg-light focus:ring-0 disabled:focus:ring text-dark dark:text-light dark:bg-dark rounded-l-none h-full rounded-md"
                />

                {text && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-0"
                    onClick={() => setText("")}
                  >
                    <Icon
                      icon="material-symbols:close"
                      width="24"
                      height="24"
                    />
                  </button>
                )}
              </div>
            </div>
            <ul className="flex flex-col gap-1 overflow-y-scroll scroll-smooth h-[320px]">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {
                    tags && (
                      <div className="flex flex-wrap gap-3">
                        {tags?.map((tag: Tag) => (
                          <ItemsSideBar
                            key={crypto.randomUUID()}
                            tag={tag}
                          />
                        ))}
                      </div>
                    ) /* : (
                    <div className="flex flex-wrap gap-3">
                      {tags &&
                        tags?.map((tag: Tag) => (
                          <ItemsSideBar
                            key={crypto.randomUUID()}
                            tag={tag}
                          />
                        ))}
                    </div>
                  ) */
                  }
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
