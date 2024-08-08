import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getTagsApi } from "@/services/TagService"
import { Tag, useTagStore } from "@/stores"
import usePaginationHome from "@/hooks/usePaginationHome"
import { Input } from "@/components/ui/input"
import { useDebounce } from "use-debounce"
import { renderSkeletonSideBar } from '../skeletons/SideBarSkeleton';
import { motion } from "framer-motion";

interface SideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ open, setOpen }: SideBarProps) {
  const setTags = useTagStore((state) => state.setTags);
  const tags = useTagStore((state) => state.tags);
  const [originalTags, setOriginalTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 350);
  const { searchParams } = usePaginationHome();

  // useEffect(() => {
  //   const handleResize = () => {
  //     setOpen(window.innerWidth > 1024)
  //   }

  //   window.addEventListener("resize", handleResize)

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

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
      setTags(updatedObjectsArray);
      setOriginalTags(updatedObjectsArray);
    } catch (error) {
      console.error("Error fetching tags", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchTags();
  }, []);

  useEffect(() => {
    handleChangeSelect(value);
  }, [value]);

  function handleChangeSelect(value: string) {
    if (value.length === 0) {
      setTags(originalTags);
    } else {
      const tagsFiltered = originalTags.filter((tag: Tag) => {
        if (tag.name.toLowerCase().includes(value.toLowerCase())) {
          return tag
        }
      })
      setTags(tagsFiltered)
      setLoading(false)
    }
  }

  const handleSidebar = () => {
    setOpen(!open)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`min-h-full transition-width z-40 duration-300 ease-out fixed lg:static border-l-[1px] border-r-[1px] border-dark dark:border-light bg-[#F9D8DF] dark:bg-[#311421] ${open ? "w-60" : "w-0 border-none"}`}
    >
      <div className="w-full h-full relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`w-full sticky top-[97px] ${open ? "px-4 pt-[34px] pb-4" : "pt-0"}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`absolute duration-150 z-50 ${open ? "right-[-18px]" : "right-[-52px] xl:right-[-50px]"} top-[30px]`}
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`${open ? "flex flex-col gap-4 text-dark dark:text-light" : "hidden"}`}
          >
            <h2 className="text-xl font-bold">CATEGORIAS</h2>

            <div className="w-full h-8 border rounded-md flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }} className="w-full relative rounded-md"
              >
                <Input
                  placeholder="Buscar una categoria"
                  value={text}
                  onChange={(e) => {setText(e.target.value)}}
                  className="w-full border border-dark dark:border-light hover:border-main focus-visible:border-main dark:focus-visible:border-main bg-light text-dark dark:text-light dark:bg-dark h-full"
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
              </motion.div>
            </div>
            
            <ul className="flex flex-col gap-1 overflow-y-scroll overflow-x-hidden scroll-smooth h-[400px]">
              {loading ? (
                renderSkeletonSideBar()
              ) : (
                <div className="w-[196px] pr-[16px]">
                  {
                    tags.length > 0 ? (
                      <motion.div className="flex flex-wrap gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {tags?.map((tag: Tag) => (
                          <ItemsSideBar
                            key={crypto.randomUUID()}
                            tag={tag}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        No se encontraron resultados
                      </motion.p>
                    )
                  }
                </div>
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}