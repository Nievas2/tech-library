import { StateCreator, create } from "zustand"
import { immer } from "zustand/middleware/immer"


export interface Tag {
  id: number
  name: string
  selected: boolean
  color: string
}

interface TagState {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  activeTag: (tagId: number) => void
  
}

const storeApi: StateCreator<TagState, [["zustand/immer", never]]> = (
  set
) => ({
  tags: [],
  setTags: (tags: Tag[]) => {
    set({ tags })
  },

  activeTag: (tagId: number) => {
    set((state) => {
      const tag = state.tags.find((tag) => tag.id === tagId)
      if (tag) {
        tag.selected = !tag.selected
      }
    })
  }
})

export const useTagStore = create<TagState>()(immer (storeApi))
