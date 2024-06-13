interface ItemsSideBarProps {
  name: string
  active: boolean
}
export default function ItemsSideBar({ name, active }: ItemsSideBarProps) {

  return (
    <li className="flex ">
      <button
        className={`${active ? "text-main" : ""}`}
        onClick={() => console.log(name)}
      >
        {name}
      </button>
    </li>
  )
}
