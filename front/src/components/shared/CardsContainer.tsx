import { Library } from "@/interfaces/Library"
import Card from "./Card"

interface CardsContainerProps {
  cards: Library[]
}

const CardsContainer = ({ cards }: CardsContainerProps) => {
  return (
    <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mb-10">
      {cards.map((card: Library, index: number) => (
        <Card 
          key={index} 
          card={card}
        />
      ))}
    </div>
  )
}

export default CardsContainer