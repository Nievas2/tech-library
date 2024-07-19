import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
/* import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu" */
import { useTheme } from "@/contexts/index"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="darkSwich"
      size="icon"
      onClick={handleChange}
      className="ml-1"
      id="theme-toggle"
      aria-label="Toggle dark mode"
      role="button"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-text" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-black" />
      )}
    </Button>
  )
}
