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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface CardProps {
  library: Library
}

const Card = ({ library }: CardProps) => {
  const { authUser } = useAuthContext()
  const [liked, setLiked] = useState(library.liked)
  const favorites = useFavoriteStore((state) => state.favorites)
  const isFavorite = favorites?.some((favorite) => favorite.id === library.id)

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

        <p className="text-base">
          {library.description.length > 90 ? (
            <>
              {library.description.slice(0, 90) + "..."}
              <Dialog>
                <DialogTrigger className="text-main">Leer más</DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-col gap-4">
                    <DialogTitle className="text-2xl font-bold leading-none">
                      {library.name}
                    </DialogTitle>

                    <div className="flex flex-col gap-4">
                      <p className="text-base text-left">{library.description}</p>

                      {/* <div className="flex flex-row flex-wrap gap-2 text-sm">
                        {library.tags?.map((tag: Tag) => (
                          <h4
                            key={tag.id}
                            style={{ backgroundColor: tag.color }}
                            className="px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light"
                          >
                            {tag.name}
                          </h4>
                        ))}
                      </div> */}
                      
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
                        </div>

                        <div className="flex flex-col">
                          <div className="flex gap-3 font-medium">
                            <div className="flex flex-row gap-1 justify-center items-center">
                              <Button
                                variant="like"
                                size="like"
                                onClick={toggleLike}
                                id="like"
                                aria-label="Like"
                                role="button"
                              >
                                <Icon
                                  icon={library.liked ? "bxs:like" : "bx:like"}
                                  width="24"
                                  height="24"
                                  className={`${
                                    library.liked
                                      ? "animate-like text-main"
                                      : "bg-[transparent] text-dark dark:text-light"
                                  }`}
                                />
                              </Button>
                              <small>{library.likesCount}</small>
                            </div>

                            <div
                              onClick={toggleFavorite}
                              className="flex justify-center items-center"
                            >
                              {isFavorite ? (
                                <div className=" mx-auto flex justify-center items-center cursor-pointer rounded-lg">
                                  <Heart
                                    className={`text-[#E81224] h-6 w-6 animate-heart`}
                                    fill="#E81224"
                                  />
                                </div>
                              ) : (
                                <div className="mx-auto flex justify-center items-center cursor-pointer transition-colors duration-300">
                                  <Heart />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-end justify-end w-full">
                          <small className="text-dark dark:text-light font-medium">
                            Sugerido por{" "}
                            <span className="font-semibold text-main">
                              @
                              {formatGoogleUsername(library.createdBy.username)}
                            </span>{" "}
                            el {formatDate(library.createdAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            library.description
          )}
        </p>

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
              <p className="text-sm">Link directo</p>
            </Button>
          </NavLink>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 font-medium">
            <div className="flex flex-row gap-1 justify-center items-center">
              <Button
                variant="like"
                size="like"
                onClick={toggleLike}
                id="like"
                aria-label="Like"
                role="button"
              >
                <Icon
                  icon={library.liked ? "bxs:like" : "bx:like"}
                  width="24"
                  height="24"
                  className={`${
                    library.liked
                      ? "animate-like text-main"
                      : "bg-[transparent] text-dark dark:text-light"
                  }`}
                />
              </Button>
              <small>{library.likesCount}</small>
            </div>

            <div
              onClick={toggleFavorite}
              className="flex justify-center items-center"
            >
              {isFavorite ? (
                <div className=" mx-auto flex justify-center items-center cursor-pointer rounded-lg">
                  <Heart
                    className={`text-[#E81224] h-6 w-6 animate-heart`}
                    fill="#E81224"
                  />
                </div>
              ) : (
                <div className="mx-auto flex justify-center items-center cursor-pointer transition-colors duration-300">
                  <Heart />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end w-full">
          <small className="text-dark dark:text-light font-medium">
            Sugerido por{" "}
            <span className="font-semibold text-main">
              @{formatGoogleUsername(library.createdBy.username)}
            </span>{" "}
            el {formatDate(library.createdAt)}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Card
