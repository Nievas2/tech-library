import { Library } from "@/interfaces/Library"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";

interface FavoriteState {
  favorites             : Library[];
  addFavoriteLibrary    : (library: Library) => void;
  deleteFavoriteLibrary : (libraryId: number) => void;
}

const storeApi: StateCreator<FavoriteState, [["zustand/immer", never]]> = (set) => ({
  favorites: [],

  addFavoriteLibrary: (library: Library) => {
    set((state) => {
      state.favorites.push(library);
    });
  },
  
  deleteFavoriteLibrary: (libraryId: number) => {
    set((state) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== libraryId);
    });
  },
})

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer(storeApi),
    {
      name: "library-storage",
    }
  )
)