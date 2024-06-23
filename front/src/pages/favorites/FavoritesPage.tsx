import CardsContainer from "@/components/shared/CardsContainer"
import { useLibraryStore } from "@/stores";

const FavoritesPage = () => {
  const favorites = useLibraryStore(state => state.favorites)
  
  console.log(favorites);
  
  return <div>{favorites && <CardsContainer cards={favorites} />}</div>
}

export default FavoritesPage