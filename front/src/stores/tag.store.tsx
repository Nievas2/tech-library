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
  tagsActives: () => Tag[]
  initialLoadTags: boolean
  setInitialLoadTags: (initialLoadTags: boolean) => void
  disableAllTags: () => void
}

const storeApi: StateCreator<TagState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  tags: [],
  setTags: (tags: Tag[]) => {
    set({ tags })
  },
  initialLoadTags: true,
  activeTag: (tagId: number) => {
    set((state) => {
      const tag = state.tags.find((tag) => tag.id === tagId)
      if (tag) {
        tag.selected = !tag.selected
      }
    })
    if (get().initialLoadTags) set({ initialLoadTags: false })
  },

  tagsActives: () => {
    const tags = get().tags

    const tagsActives = tags.filter((tag) => tag.selected)
    return tagsActives
  },

  setInitialLoadTags: (initialLoadTags: boolean) => {
    set({ initialLoadTags })
  },
  disableAllTags : () => {
    set((state) => {
      state.tags.forEach((tag) => {
        tag.selected = false
      })
    })
  }
})

export const useTagStore = create<TagState>()(immer(storeApi))
