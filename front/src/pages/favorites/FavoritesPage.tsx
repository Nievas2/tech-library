import CardsContainer from "@/components/shared/CardsContainer"
import { useFavoriteStore } from "@/stores";
import { motion } from "framer-motion";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites)

  return (
    <motion.div className="flex flex-col gap-6"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-3xl font-bold text-center">Favoritos</h1>
      {favorites.length > 0 ? (
        <CardsContainer libraries={favorites} />
      ) : (
        <div className="flex justify-center items-center h-[58vh] text-center">
          <p className="text-2xl font-bold">Aún no has agregado librerias a tus favoritos...</p>
        </div>
      )}
    </motion.div>
  )
}


export default FavoritesPage