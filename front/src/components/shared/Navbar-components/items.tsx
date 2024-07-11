import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface ItemsNavbarProps {
  name: string
  path: string
}
export default function ItemsNavbar({ name, path }: ItemsNavbarProps) {
  return (
    <Link
      to={path}
    >
      <Button variant="authButton">
        {name}
      </Button>
    </Link>
  )
}
