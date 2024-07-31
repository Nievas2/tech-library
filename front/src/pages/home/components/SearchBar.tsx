import { Input } from "@/components/ui/input"
import usePaginationHome from "@/hooks/usePaginationHome"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const SearchBar = () => {
  const { handleSearch, searchParams } = usePaginationHome()
  const [text, setText] = useState("")
  const [value] = useDebounce(text, 350)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search")
    const searchParamsData = searchParams.get("search")
    search
      ? setText(search)
      : searchParamsData
      ? setText(searchParamsData)
      : setText("")
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search")
    const searchParamsData = searchParams.get("search")
    if (search === text || searchParamsData === text) {
      return
    }
    handleSearch(value)
  }, [value])

  return (
    <div className="sticky z-30 top-[125px] flex flex-1 h-10 justify-end md:justify-center">
      <div className="w-[80%] flex">
        <div className="bg-light dark:bg-dark rounded-md border rounded-r-none w-10 grid place-content-center border-dark dark:border-light">
          <Icon
            icon="material-symbols:search"
            width="24"
            height="24"
          />
        </div>

        <div className="w-full relative">
          <Input
            placeholder="Buscar una libreria"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            className="w-full border border-dark dark:border-light hover:border-main focus-visible:border-main bg-light text-dark dark:text-light dark:bg-dark rounded-l-none h-full"
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
    </div>
  )
}
export default SearchBar
