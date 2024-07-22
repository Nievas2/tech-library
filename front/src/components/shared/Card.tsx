import { Heart, Link } from "lucide-react"
import { Button } from "../ui/button"
import { NavLink } from "react-router-dom"
import { Library } from "@/interfaces/Library"
import { Tag } from "@/interfaces/Tag"
import { formatDate } from "@/utils"
import { useFavoriteStore } from "@/stores"
import { Icon } from "@iconify/react/dist/iconify.js"
import { deleteLibraryLike, postLibraryLike } from "@/services/LibraryService"
import { useAuthContext } from "@/contexts"
import { useState } from "react"
import { formatGoogleUsername } from "@/utils/formatGoogleUsername"

interface CardProps {
  library : Library
}

const Card = ({ library }: CardProps) => {
  const { authUser } = useAuthContext();
  const [liked, setLiked] = useState(library.liked);
  const favorites = useFavoriteStore((state) => state.favorites);
  const isFavorite = favorites?.some((favorite) => favorite.id === library.id);

  const addFavoriteLibrary = useFavoriteStore(
    (state) => state.addFavoriteLibrary
  )

  const deleteFavoriteLibrary = useFavoriteStore(
    (state) => state.deleteFavoriteLibrary
  )

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavoriteLibrary(library.id)
    } else {
      addFavoriteLibrary(library)
    }
  }

  async function toggleLike() {
    try {
      if (liked === false && library.liked === false) {
        const response = await postLibraryLike(
          String(library.id),
          authUser!.user.id
        )
        if (response.status === 200) {
          library.liked = true
          library.likesCount = library.likesCount! + 1
          setLiked(true)
        }
      } else {
        const response = await deleteLibraryLike(
          String(library.id),
          authUser!.user.id
        )
        if (response.status === 200) {
          library.liked = false
          library.likesCount = library.likesCount ? library.likesCount - 1 : 0
          setLiked(false)
        }
      }
    } catch (error) {
      throw error
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
              id="link"
              aria-label="Direct Link"
              role="button"
            >
              <Link className="h-[20px] w-[20px]" />
              <p className="text-sm">Direct Link</p>
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

        <div className="flex flex-row ">
          <div className="flex items-center justify-center gap-2 font-medium">
            <Button
              className={`flex items-center px-[5px] py-0 border border-main rounded-full transition-colors duration-100 hover:text-light hover:bg-main ${library.liked ? "bg-main" : "bg-[transparent]"}`}
              variant="ghost"
              onClick={toggleLike}
              id="like"
              aria-label="Like"
              role="button"
            >
              <Icon
                icon="ei:like"
                width="30"
                height="30"
                className={`${
                  library.liked
                    ? "text-light dark:text-light animate-like"
                    : "bg-[transparent]"
                }`}
              />
            </Button>
            <small>{library.likesCount}</small>
          </div>

          <div className="flex flex-col flex-1 items-end justify-center">
            <small>Suggested by </small>

            <small>
              <span className="font-semibold text-main flex">
                @{formatGoogleUsername(library.createdBy.username)}
              </span>{" "}
            </small>

            <small>
              <span className="flex">{formatDate(library.createdAt)}</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card