import { useState } from "react"

export interface exampleDate {
  name: string
  selected: boolean
}
interface ItemsSideBarProps {
  name: string
  selected: boolean
}
export default function ItemsSideBar({ name, selected }: ItemsSideBarProps) {
  const [active, setActive] = useState(selected)
  function handleClick() {
    setActive(!active)
  }
  return (
    <li className="flex border-separate">
      <button
        className={`${active ? "text-main" : ""}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </li>
  )
}
