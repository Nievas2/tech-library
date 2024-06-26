import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tag, useTagStore } from "@/stores"

export default function SideBar() {
  const [open, setOpen] = useState(window.innerWidth > 768)
  const tags = useTagStore(state => state.tags)

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSidebar = () => {
    setOpen(!open)
  };

  return (
    <section
      className={`h-full transition-width duration-300 ease-out fixed z-10 md:static bg-light dark:bg-dark md:bg-main/15 md:dark:bg-main/15  ${
        open ? "w-60" : "w-0"
      } `}
    >
      <div
        className={`w-full h-full relative ${
          open
            ? "px-4 pt-[34px] border-r border-r-dark dark:border-r-light md:border-l md:border-l-dark dark:md:border-l-light"
            : "pt-0"
        }`}
      >
        <div
          className={`absolute duration-150 ${
            open ? "right-[-18px]" : "right-[-50px] xl:right-[-50px]"
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

        <div className={`${open ? "flex flex-col gap-4" : "hidden"}`}>
          <h2 className="text-xl font-bold">TECNOLOGIES</h2>
          <ul className="flex flex-col gap-1">
            {tags?.map((tag: Tag) => (
              <ItemsSideBar
                key={tag.name}
                tag={tag}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}