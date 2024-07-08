import { Input } from "@/components/ui/input"
import usePagination from "@/hooks/usePagination"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const SearchBar = () => {
  const { handleSearch, searchParams } = usePagination()
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
    <div className="w-[80%] sticky z-0 top-28 flex h-10 ">
      <div className="bg-light dark:bg-dark rounded-md border rounded-r-none w-10 grid place-content-center border-dark dark:border-light">
        <Icon
          icon="material-symbols:search"
          width="24"
          height="24"
        />
      </div>
      <div className="w-full relative">
        <Input
          placeholder="Search library"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          className="w-full bg-light focus:ring-0 disabled:focus:ring text-dark dark:text-light dark:bg-dark rounded-l-none h-full border border-dark dark:border-light"
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
  )
}
export default SearchBar
