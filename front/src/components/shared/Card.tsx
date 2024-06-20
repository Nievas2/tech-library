import { Heart, Link } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Library } from "@/interfaces/Library"
import { Tag } from "@/interfaces/Tag"
import { useLibraries } from "@/stores/Library"

interface CardProps {
  card: Library
}
const Card = ({ card }: CardProps) => {
  const [favoriteActive, setFavoriteActive] = useState(false)
  const addFavoriteLibrary = useLibraries((state) => state.addFavoriteLibrary)
  const deleteFavoriteLibrary = useLibraries(
    (state) => state.deleteFavoriteLibrary
  )
  const favorites = useLibraries((state) => state.favorites)

  function handleFavorite() {
    if (!favoriteActive) {
      setFavoriteActive(!favoriteActive)
      addFavoriteLibrary(card)
    } else {
      setFavoriteActive(!favoriteActive)
      const index = favorites?.findIndex((favorite) => favorite.id == card.id)
      console.log(index)

      if (index != undefined && index >= 0  ) deleteFavoriteLibrary(index)
    }
  }
  useEffect(() => {
    favorites?.find((favorite) => favorite.id === card.id)
      ? setFavoriteActive(true)
      : setFavoriteActive(false)
  }, [favoriteActive])
  return (
    <div className="flex bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{card.name}</h2>

        <p className="text-base">{card.description}</p>

        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {card.tags?.map((tag: Tag) => {
            // const tagColor = tagColors[tag] || { bgColor: '#ffffff45', borderColor: '#000000' };
            const tagColor = tag || { bgColor: "#ffffff45" }
            return (
              <h4
                key={crypto.randomUUID()}
                style={{ backgroundColor: tagColor?.bgColor }}
                // style={{ backgroundColor: tagColor.bgColor, borderColor: tagColor.borderColor }}
                // className="px-2 py-1 rounded-lg border font-extrabold text-dark [text-shadow:_1px_1px_0px_rgb(255_255_255_/_100%)] dark:text-light dark:[text-shadow:_1px_1px_0_rgb(0_0_0_/_100%)]">
                // border-dark dark:border-light
                className="px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light "
              >
                {tag.name}
              </h4>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-center items-center">
          <NavLink
            className="flex flex-grow"
            to="/favorites"
          >
            <Button
              variant="directLink"
              className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointe"
            >
              <Link />
              <p>Direct Link</p>
            </Button>
          </NavLink>

          <div onClick={handleFavorite}>
            {favoriteActive ? (
              <div className="animate-fade-in-scale mx-auto flex justify-center items-center cursor-pointer border border-[#E81224] px-4 py-2 rounded-lg bg-[#E81224]/35">
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

        <div className="flex flex-row items-center justify-end gap-2">
          <small>
            Suggested by{" "}
            <span className="font-semibold text-main">
              {card.createdBy.name}
            </span>
          </small>
          <small>|</small>
          <small>02-08-1999</small>
        </div>
      </div>
    </div>
  )
}

export default Card
