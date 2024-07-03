import { Input } from "@/components/ui/input"
import usePagination from "@/hooks/usePagination"
import { Library } from "@/interfaces/Library"
import { getLibrariesSearch } from "@/services/LibraryService"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

interface SearchBarProps {
  setLibrary: React.Dispatch<React.SetStateAction<Library[]>>
  setSearch: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchBar = ({ setLibrary, setSearch }: SearchBarProps) => {
  const [text, setText] = useState("")
  const [value] = useDebounce(text, 500)
  const {
    setTotalPages,
    getInitialPage
  } = usePagination()
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        if(value === "") return setSearch(false)
        console.log(value)
        const currentPageFromUrl = getInitialPage()
        const {libraries, totalPages} = await getLibrariesSearch(
          currentPageFromUrl,
          1,
          "1,2",
          value
        )
        setLibrary(libraries)
        setTotalPages(totalPages)
        setSearch(true)
      } catch (error) {}
    }
    fetchLibraries()
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
