import { Link } from "react-router-dom"

interface ItemsNavbarProps {
  name: string
  path: string
}
export default function ItemsNavbar({ name, path }: ItemsNavbarProps) {
  return (
    <Link
      to={path}
      className="text-black rounded-md px-3 py-2 text-sm font-medium sm:rounded-md sm: sm:border-[1px] sm:border-main hover:bg-accent hover:text-accent-foreground sm:shadow-lg sm:shadow-tertiary/75"
    >
      {name}
    </Link>
  )
}
