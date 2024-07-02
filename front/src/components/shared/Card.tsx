import { Heart, Link } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Library } from "@/interfaces/Library"
import { Tag } from "@/interfaces/Tag"
import { useFavoriteStore } from "@/stores"

interface CardProps {
  library : Library
}

const Card = ({ library }: CardProps) => {
  const favorites             = useFavoriteStore((state) => state.favorites);
  const addFavoriteLibrary    = useFavoriteStore((state) => state.addFavoriteLibrary);
  const deleteFavoriteLibrary = useFavoriteStore((state) => state.deleteFavoriteLibrary);

  const isFavorite = favorites?.some((favorite) => favorite.id === library.id);
  const [favoriteActive, setFavoriteActive] = useState(isFavorite);

  const toggleFavorite = () => {
    if (favoriteActive) {
      deleteFavoriteLibrary(library.id);
    } else {
      addFavoriteLibrary(library);
    }
    setFavoriteActive(!favoriteActive);
  };

  useEffect(() => {
    setFavoriteActive(isFavorite);
  }, [isFavorite]);

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
          <NavLink className="flex flex-grow" to="/favorites">
            <Button
              variant="directLink"
              className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointer"
            >
              <Link />
              <p>Direct Link</p>
            </Button>
          </NavLink>

          <div onClick={toggleFavorite}>
            {favoriteActive ? (
              <div className="animate-fade-in-scale mx-auto flex justify-center items-center cursor-pointer border border-[#E81224] px-4 py-2 rounded-lg bg-[#E81224]/35">
                <Heart className="text-[#E81224]" fill="#E81224" />
              </div>
            ) : (
              <div className="mx-auto flex justify-center items-center cursor-pointer border border-dark dark:border-light px-4 py-2 rounded-lg hover:bg-[#E81224]/20  transition-colors duration-300">
                <Heart />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <small>
            Suggested by{" "}
            <span className="font-semibold text-main">{library.createdBy.name}</span>
          </small>
          <small>|</small>
          <small>02-08-1999</small>
        </div>
      </div>
    </div>
  )
}

export default Card
