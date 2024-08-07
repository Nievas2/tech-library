import usePaginationHome from "@/hooks/usePaginationHome"
import { Tag, useTagStore } from "@/stores"

interface ItemsSideBarProps {
  tag: Tag
}

export default function ItemsSideBar({ tag }: ItemsSideBarProps) {
  const activeTag = useTagStore((state) => state.activeTag)
  const {sincronizeParams} = usePaginationHome()

  const handleClick = () => {
    activeTag(tag.id)
    sincronizeParams()
  }

  return (
    <li className="flex">
      <button
        className={`${tag.selected ? "bg-main text-light" : ""} capitalize px-2 py-1 rounded-md border border-main hover:transition-colors duration-150`}
        onClick={handleClick}
        translate="no"
      >
        {tag.name}
      </button>
    </li>
  )
}