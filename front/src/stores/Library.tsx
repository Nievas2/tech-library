import { Library } from "@/interfaces/Library"
import { create } from "zustand"

interface State {
  libraries: Library[] | undefined
  favorites: Library[] | undefined
  addFavoriteLibrary: (library: Library) => void
  deleteFavoriteLibrary: (libraryId: number) => void
}

export const useLibreries = create<State>((set, get) => {
  return {
    libraries: undefined,
    favorites: undefined,
    addFavoriteLibrary: (library: Library) => {
      const { libraries } = get()
      const newLibrary = structuredClone(libraries)
      newLibrary?.push(library)
      set({ libraries: newLibrary })
    },
    deleteFavoriteLibrary: (libraryId: number) => {
      const { libraries } = get()
      const newLibrary = structuredClone(libraries)
      newLibrary?.splice(libraryId, 1)
      set({ libraries: newLibrary })
    }
  }
})
