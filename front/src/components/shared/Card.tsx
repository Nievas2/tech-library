import { Heart, Link as LRLink } from "lucide-react"
import { Button } from "../ui/button"
import { Link, NavLink } from "react-router-dom"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface CardProps {
  library: Library
}

const Card = ({ library }: CardProps) => {
  const { authUser } = useAuthContext();
  const [liked, setLiked] = useState(library.liked);
  const favorites = useFavoriteStore((state) =>
    state.favorites.find((fav) => fav.userId === authUser?.user.id)?.libraries || []
  );
  const isFavorite = favorites.some((fav) => fav.id === library.id);
  const [showAuthLikeModal, setShowAuthLikeModal] = useState(false);
  const [showAuthFavoriteModal, setShowAuthFavoriteModal] = useState(false);

  const addFavoriteLibrary = useFavoriteStore(
    (state) => state.addFavoriteLibrary
  )

  const deleteFavoriteLibrary = useFavoriteStore(
    (state) => state.deleteFavoriteLibrary
  )

  const toggleFavorite = () => {
    if (!authUser) {
      setShowAuthFavoriteModal(true);
      return;
    }

    if (isFavorite) {
      deleteFavoriteLibrary(authUser.user.id, library.id);
    } else {
      addFavoriteLibrary(authUser.user.id, library);
    }
  };

  async function toggleLike() {
    if (!authUser) {
      setShowAuthLikeModal(true);
      return;
    }

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
  }

  return (
    <motion.div 
      className="flex bg-main/15 flex-col justify-between gap-6 rounded-md shadow-xl p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.h2 
            className="text-2xl font-bold"
            initial={{x: -10, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 10, opacity: 0}}
            transition={{ duration: 0.35 }}
          >
            {library.name}
        </motion.h2>

        <motion.p 
          className="text-base" 
          initial={{x: 10, opacity: 0}} 
          animate={{x: 0, opacity: 1}} 
          exit={{x: -10, opacity: 0}} 
          transition={{ duration: 0.35 }}
        >
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
                      <p className="text-base text-left">
                        {library.description}
                      </p>

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
                              <LRLink className="h-[20px] w-[20px]" />
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
        </motion.p>

        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {library.tags?.map((tag: Tag) => (
            <h4
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light"
              translate="no"
            >
              {tag.name}
            </h4>
          ))}
        </div>
      </motion.div>

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
              <LRLink className="h-[20px] w-[20px]" />
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

      <Dialog open={showAuthLikeModal} onOpenChange={setShowAuthLikeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Te gusta esta librería?</DialogTitle>
          </DialogHeader>
          <p className="text-center">Inicia sesión o regístrate para que tu opinión cuente.</p>
          <div className="flex flex-row gap-2 w-fit mx-auto">
            <Link
              to="/login"
            >
              <Button variant="authButton" onClick={() => setShowAuthLikeModal(false)}>Iniciar sesión</Button>
            </Link>

            <Link
              to="/signup"
            >
              <Button variant="authButton" onClick={() => setShowAuthLikeModal(false)}>Registrarse</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAuthFavoriteModal} onOpenChange={setShowAuthFavoriteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Querés agregar a tus favoritos esta libreria?</DialogTitle>
          </DialogHeader>
          <p className="text-center">Inicia sesión o regístrate para agregar a tus favoritos esta libreria.</p>
          <div className="flex flex-row gap-2 w-fit mx-auto">
            <Link
              to="/login"
            >
              <Button variant="authButton" onClick={() => setShowAuthLikeModal(false)}>Iniciar sesión</Button>
            </Link>

            <Link
              to="/signup"
            >
              <Button variant="authButton" onClick={() => setShowAuthLikeModal(false)}>Registrarse</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

export default Card