import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react/dist/iconify.js"

const SearchBar = () => {
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
        className="w-full bg-light focus:ring-0 disabled:focus:ring text-dark dark:text-light dark:bg-dark rounded-l-none h-full border border-dark dark:border-light"
      />
    </div>
  )
}
export default SearchBar
