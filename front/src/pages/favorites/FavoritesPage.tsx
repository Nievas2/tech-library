import CardsContainer from "@/components/shared/CardsContainer"
import { useFavoriteStore } from "@/stores";

const FavoritesPage = () => {
  const favorites = useFavoriteStore(state => state.favorites)
  
  console.log(favorites);
  
  return <div>{favorites && <CardsContainer cards={favorites} />}</div>
}

export default FavoritesPage