import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Book } from "lucide-react"
import { Link } from "react-router-dom"

const Marketing = () => {
  return (
    <div className="flex items-center justify-center flex-col px-5">
      <div className={cn(
        "flex items-center justify-center flex-col",
      )}>
        <div className="mb-4 flex items-center border border-main text-main bg-main bg-opacity-20 shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase text-center font-semibold">
          <Book className="h-6 w-6 mr-2" />
          No 1 task managment
        </div>
        <h1 className="font-bold text-3xl mx-1 sm:mx-0 md:text-6xl text-center mb-6">
          TechLibrary helps team move
        </h1>
        <div className="font-bold text-3xl md:text-6xl bg-gradient-to-r from-main to-tertiary text-light px-6 py-2 rounded-md w-fit">
          work forward
        </div>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
      )}>
        Collaborate, manage projects and reach new productivity peaks. From high rises to the home office, the work your team works is unique - accomplish it all with TechLibrary
      </div>
      <Button variant="marketing" className="mt-6" size="lg"
      id="explore"
      aria-label="explore"
      role="button"
      >
        <Link to="/home">
          EXPLORE TECHLIBRARY
        </Link>
      </Button>
    </div>
  )
}

export default Marketing