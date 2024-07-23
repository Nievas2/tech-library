import { Library } from "@/interfaces/Library"
import Card from "./Card"

interface CardsContainerProps {
  libraries: Library[]
  open?: boolean;
}

const CardsContainer = ({ libraries, open }: CardsContainerProps) => {
  return (
    <div className={`mx-auto max-w-[1240px] grid sm:grid-cols-2 md:grid-cols-2 ${open ? "lg:grid-cols-2" : "lg:grid-cols-3"} xl:grid-cols-3 justify-center gap-5`}>
    {/* <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5"> */}
      {libraries?.map((library: Library, index: number) => (
        <Card
          key={index}
          library={library}
        />
      ))}
    </div>
  )
}

export default CardsContainer