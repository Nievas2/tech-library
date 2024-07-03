import { Tag, useTagStore } from "@/stores"

interface ItemsSideBarProps {
  tag: Tag
}

export default function ItemsSideBar({ tag }: ItemsSideBarProps) {
  const activeTag = useTagStore((state) => state.activeTag)

  const handleClick = () => {
    activeTag(tag.id)
  }

  return (
    <li className="flex">
      <button
        className={`${tag.selected ? "text-main" : ""} capitalize`}
        onClick={handleClick}
      >
        {tag.name}
      </button>
    </li>
  )
}
