import { Library } from "@/interfaces/Library"
import Card from "./Card"

interface CardsContainerProps {
  libraries: Library[]
}

const CardsContainer = ({ libraries }: CardsContainerProps) => {
  return (
    <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
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