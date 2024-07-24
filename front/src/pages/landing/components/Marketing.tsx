import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

const Marketing = () => {
  return (
    <div className="flex items-center justify-center flex-col p-5">
      <div className={cn(
        "flex items-center justify-center flex-col",
      )}>
        <div className="font-bold text-3xl md:text-6xl bg-gradient-to-r from-main to-tertiary text-light px-6 py-2 rounded-md w-fit">
          TechLibrary
        </div>
        <h1 className="font-bold text-3xl mt-3 sm:mx-0 md:text-6xl text-center mb-4">
          Toda la documentación <br /> en un solo lugar
        </h1>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
      )}>
        Explora entre las librerías más populares y útiles para tus proyectos, además de herramientas que facilitaran tus tareas diarias.
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 max-w-xs md:max-w-2xl text-center",
      )}>
        Con un rapido acceso hacia su documentación oficial.
      </div>
      <Button variant="marketing" className="mt-6" size="lg"
      id="explore"
      aria-label="explore"
      role="button"
      >
        <Link to="/home">
          EXPLORAR TECHLIBRARY
        </Link>
      </Button>
    </div>
  )
}

export default Marketing