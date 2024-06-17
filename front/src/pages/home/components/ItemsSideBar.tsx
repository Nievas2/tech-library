import { Tecnology } from "@/interfaces/Tecnology"
import { useTecnologies } from "@/stores/Tecnologies"
import { capitalizeFirstLetter } from "@/utils"
import { useState } from "react"

interface ItemsSideBarProps {
  tecnology: Tecnology
}
export default function ItemsSideBar({ tecnology }: ItemsSideBarProps) {
  const [active, setActive] = useState(tecnology.selected)
  const activeTecnology = useTecnologies(state => state.activeTecnology)
  
  function handleClick() {
    setActive(!active)
    activeTecnology(tecnology.id)
  }

  return (
    <li className="flex">
      <button
        className={`${active ? "text-main" : ""}`}
        onClick={handleClick}
      >
        {capitalizeFirstLetter(tecnology.name)}
      </button>
    </li>
  )
}
