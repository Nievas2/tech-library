import { Heart, Link } from "lucide-react"
import { Button } from "../ui/button"
import { NavLink } from "react-router-dom"
import { Library } from "@/interfaces/Library"
import { Tag } from "@/interfaces/Tag"
import { formatDate } from "@/utils"
import { useFavoriteStore } from "@/stores"

interface CardProps {
  library: Library
}
export const removeNumbers = (username: string): string => {
  const cleanedName = username.replace(/-\d+/, "")
  return cleanedName
}

const Card = ({ library }: CardProps) => {
  const favorites = useFavoriteStore((state) => state.favorites)
  const addFavoriteLibrary = useFavoriteStore(
    (state) => state.addFavoriteLibrary
  )
  const deleteFavoriteLibrary = useFavoriteStore(
    (state) => state.deleteFavoriteLibrary
  )

  const isFavorite = favorites?.some((favorite) => favorite.id === library.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavoriteLibrary(library.id)
    } else {
      addFavoriteLibrary(library)
    }
  }

  return (
    <div className="flex bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{library.name}</h2>
        <p className="text-base">{library.description}</p>
        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {library.tags?.map((tag: Tag) => (
            <h4
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light"
            >
              {tag.name}
            </h4>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-center items-center">
          <NavLink
            className="flex flex-grow"
            target="_blank"
            to={library.link}
          >
            <Button
              variant="directLink"
              className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointer"
            >
              <Link />
              <p>Direct Link</p>
            </Button>
          </NavLink>

          <div onClick={toggleFavorite}>
            {isFavorite ? (
              <div className="animate-fade-in-scale mx-auto flex justify-center items-center cursor-pointer border border-dark dark:border-light px-4 py-2 rounded-lg">
                <Heart
                  className="text-[#E81224]"
                  fill="#E81224"
                />
              </div>
            ) : (
              <div className="mx-auto flex justify-center items-center cursor-pointer border border-dark dark:border-light px-4 py-2 rounded-lg hover:bg-[#E81224]/20  transition-colors duration-300">
                <Heart />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end flex-row items-center">
          <small>
            Suggested by{" "}
            <span className="font-semibold text-main">
              @{removeNumbers(library.createdBy.username)}
            </span>{" "}
            on {formatDate(library.createdAt)}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Card
