import { TagState, useTags } from "@/stores/Tag"
import { capitalizeFirstLetter } from "@/utils"
import { useState } from "react"

interface ItemsSideBarProps {
  tag: TagState
}
export default function ItemsSideBar({ tag }: ItemsSideBarProps) {
  const [active, setActive] = useState(tag.selected)
  const activeTag = useTags(state => state.activeTag)
  
  function handleClick() {
    setActive(!active)
    activeTag(tag.id)
  }

  return (
    <li className="flex">
      <button
        className={`${active ? "text-main" : ""}`}
        onClick={handleClick}
      >
        {capitalizeFirstLetter(tag.name)}
      </button>
    </li>
  )
}
