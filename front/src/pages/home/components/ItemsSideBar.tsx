import { Tag, useTagStore } from "@/stores"
import { capitalizeFirstLetter } from "@/utils"
import { useState } from "react"

interface ItemsSideBarProps {
  tag: Tag
}
export default function ItemsSideBar({ tag }: ItemsSideBarProps) {
  const [active, setActive] = useState(tag.selected)
  const activeTag = useTagStore(state => state.activeTag)
  
  const handleClick = () => {
    setActive(!active);
    activeTag(tag.id);
  };

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

// import { Tag, useTagStore } from "@/stores"
// import { capitalizeFirstLetter } from "@/utils"

// interface ItemsSideBarProps {
//   tag: Tag
// }

// export default function ItemsSideBar({ tag }: ItemsSideBarProps) {
//   const { tags, activeTag } = useTagStore(state => ({ 
//     tags: state.tags, 
//     activeTag: state.activeTag 
//   }));

//   const handleClick = () => {
//     activeTag(tag.id);
//   };

//   return (
//     <li className="flex">
//       <button
//         className={`${tag.selected ? "text-main" : ""}`}
//         onClick={handleClick}
//       >
//         {capitalizeFirstLetter(tag.name)}
//       </button>
//     </li>
//   )
// }