import { Tecnology } from "@/interfaces/Tecnology"
import { create } from "zustand"

interface State {
  tecnologies: Tecnology[] | undefined
  favorites: Tecnology[] | undefined
  activeTecnology: (tecnologyId: number) => void
  addFavoriteTecnology: (tecnology: Tecnology) => void
  deleteFavoriteTecnology: (tecnologyId: number) => void
}

export const useTecnologies = create<State>((set, get) => {
  return {
    tecnologies: [
      {
        id: 1,
        name: "javascript",
        selected: false
      },
      {
        id: 2,
        name: "typescript",
        selected: false
      }
    ],
    favorites: undefined,
    activeTecnology: (tecnologyId: number) => {
      const { tecnologies } = get()
      const newTecnology = structuredClone(tecnologies)
      newTecnology?.map((tecnology) => {
        if (tecnologyId === tecnology.id) {
          tecnology.selected = !tecnology.selected
        }
      })
      set({ tecnologies: newTecnology })
    },
    addFavoriteTecnology: (tecnology: Tecnology) => {
      const { tecnologies } = get()
      const newTecnology = structuredClone(tecnologies)
      newTecnology?.push(tecnology)
      set({ tecnologies: newTecnology })
    },
    deleteFavoriteTecnology: (tecnologyId: number) => {
      const { tecnologies } = get()
      const newTecnology = structuredClone(tecnologies)
      newTecnology?.splice(tecnologyId, 1)
      set({ tecnologies: newTecnology })
    }
  }
})
