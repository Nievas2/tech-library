import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useLibraryStore } from "@/stores"

const HomePage = () => {
  const libraries = useLibraryStore((state) => state.libraries)

  return (
    <>
      <section className="flex flex-row">
        <div className="flex flex-1">
          <SideBar />
        </div>
        <div className="pt-7 flex flex-col gap-7 px-4 justify-center items-end md:items-center">
          <SearchBar />
          {libraries && <CardsContainer cards={libraries} />}
        </div>
      </section>
    </>
  )
}

export default HomePage
