import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface ItemsNavbarProps {
  name: string
  path: string
}
export default function ItemsNavbar({ name, path }: ItemsNavbarProps) {
  return (
    <Button variant="authButton">
      {/* bg-main hover:bg-main/80 px-4 py-2 rounded-md border text-sm font-semibold text-light border-main transition-colors duration-150 */}
      <Link
        to={path}
      >
        {name}
      </Link>
    </Button>
  )
}
