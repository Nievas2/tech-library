import { Library } from "@/interfaces/Library"

const StateCard = ({ card }: { card: Library }) => {
  return (
    <div className="flex bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl hover:scale-[1.03] hover:transition-transform duration-500 p-4">
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{card.name}</h2>
        <p className="text-base">{card.description}</p>
      </div>
    </div>
  )
}

export default StateCard
