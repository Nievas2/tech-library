import Card from "./Card"

const CardsContainer = ({ cards, tagColors }: any) => {
  return (
    <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 sm:p-2 lg:grid-cols-3 justify-center gap-5 mb-10 mr-5">
      {cards.map((card: any, index: number) => (
        <Card 
          key={index} 
          card={card}
          tagColors={tagColors}
        />
      ))}
    </div>
  )
}

export default CardsContainer