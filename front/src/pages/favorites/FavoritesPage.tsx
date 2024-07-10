import CardsContainer from "@/components/shared/CardsContainer"
import { useFavoriteStore } from "@/stores";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites)

  return (
    <div>
      {favorites.length > 0 ? (
        <CardsContainer libraries={favorites} />
      ) : (
        <div className="flex justify-center items-center h-[65vh] text-center">
          <p className="text-2xl font-bold">You haven't added anything to your favorites yet...</p>
        </div>
      )}
    </div>
  )
}


export default FavoritesPage