import { Library } from "@/interfaces/Library"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";

interface FavoriteState {
  favorites: { userId: string; libraries: Library[] }[];
  addFavoriteLibrary: (userId: string, library: Library) => void;
  deleteFavoriteLibrary: (userId: string, libraryId: number) => void;
  setUserFavorites: (userId: string, libraries: Library[]) => void;
}

const storeApi: StateCreator<FavoriteState, [["zustand/immer", never]]> = (set) => ({
  favorites: [],

  // Función para establecer o actualizar los favoritos de un usuario
  setUserFavorites: (userId: string, libraries: Library[]) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex((fav) => fav.userId === userId); // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si ya existen favoritos para el usuario, actualiza la lista de libraries
        state.favorites[existingIndex].libraries = libraries; 
      } else {
        // Si no existen, crea una nueva entrada en el arreglo de favoritos
        state.favorites.push({ userId, libraries });
      }
    });
  },

  // Función para agregar una library a los favoritos de un usuario
  addFavoriteLibrary: (userId: string, library: Library) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex((fav) => fav.userId === userId); // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si ya existen, agrega la nueva library a la lista
        state.favorites[existingIndex].libraries.push(library);
        // Actualiza el localStorage con la nueva lista de libraries
        localStorage.setItem(`favorites-${userId}`, JSON.stringify(state.favorites[existingIndex].libraries));
      } else {
        // Si no existen, crea una nueva entrada y agrega la library
        const newFavorites = { userId, libraries: [library] };
        state.favorites.push(newFavorites);
        // Actualiza el localStorage con la nueva lista de libraries
        localStorage.setItem(`favorites-${userId}`, JSON.stringify(newFavorites.libraries));
      }
    });
  },

  // Función para eliminar una library de los favoritos de un usuario
  deleteFavoriteLibrary: (userId: string, libraryId: number) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex((fav) => fav.userId === userId); // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si existen favoritos, filtra la library que se desea eliminar
        state.favorites[existingIndex].libraries = state.favorites[existingIndex].libraries.filter((fav) => fav.id !== libraryId);
        // Actualiza el localStorage con la nueva lista de libraries
        localStorage.setItem(`favorites-${userId}`, JSON.stringify(state.favorites[existingIndex].libraries));
      }
    });
  },
});

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer(storeApi),
    {
      name: "library-storage",
    }
  )
)