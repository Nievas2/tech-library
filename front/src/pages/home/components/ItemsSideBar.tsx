import { Tecnology } from "@/interfaces/Tecnology"
import { useTecnologies } from "@/stores/Tecnologies"
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
    <li className="flex border-separate py-1">
      <button
        className={`${active ? "text-main" : ""}`}
        onClick={handleClick}
      >
        {tecnology.name}
      </button>
    </li>
  )
}
