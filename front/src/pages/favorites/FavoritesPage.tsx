import CardsContainer from "@/components/shared/CardsContainer"
import { useFavoriteStore } from "@/stores";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites)

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Favorites</h1>
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