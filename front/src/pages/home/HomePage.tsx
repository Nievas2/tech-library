import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import { useLibraries } from "@/stores/Library"
import SearchBar from "./components/SearchBar"
import { Input } from "@/components/ui/input"

const HomePage = () => {
  const libraries = useLibraries((state) => state.libraries)

  return (
    <>
      <section className="flex flex-row pt-16">
        <div className="flex flex-1">
          <SideBar />
        </div>
        <div className="pt-14 flex flex-col gap-5 px-4">
          <SearchBar />
          {libraries && <CardsContainer cards={libraries} />}
        </div>
      </section>
    </>
  )
}

export default HomePage
