import CardsContainer from "@/components/shared/CardsContainer"
import { useLibraries } from "@/stores/Library"

const FavoritesPage = () => {
  const favorites = useLibraries((state) => state.favorites)
  console.log(favorites);
  
  return <div>{favorites && <CardsContainer cards={favorites} />}</div>
}

export default FavoritesPage
