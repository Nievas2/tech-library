import CardsContainer from "@/components/shared/CardsContainer"
import { useFavoriteStore } from "@/stores";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites)
  
  return <div>{favorites && <CardsContainer libraries={favorites} />}</div>
}

export default FavoritesPage