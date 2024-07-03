import { Input } from "@/components/ui/input"
import usePagination from "@/hooks/usePagination"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const SearchBar = () => {
  const { handleSearch } = usePagination()
  const [text, setText] = useState("")
  const [value] = useDebounce(text, 350)
  useEffect(() => {
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

      <Input
        placeholder="Search library"
        onChange={(e) => {
          setText(e.target.value)
        }}
        className="w-full bg-light focus:ring-0 disabled:focus:ring text-dark dark:text-light dark:bg-dark rounded-l-none h-full border border-dark dark:border-light"
      />
    </div>
  )
}
export default SearchBar
