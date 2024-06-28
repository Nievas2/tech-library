import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";

export interface Tag {
  id       : number
  name     : string
  selected : boolean
}

interface TagState {
  tags      : Tag[]
  activeTag : (tagId: number) => void
}

const storeApi: StateCreator<TagState, [["zustand/immer", never]]> = (set) => ({
  tags: [],
  
  activeTag: (tagId: number) => {
    set((state) => {
      const tag = state.tags.find(tag => tag.id === tagId);
      if (tag) {
        tag.selected = !tag.selected;
      }
    });
  },
})

export const useTagStore = create<TagState>()(
  persist(
    immer(storeApi),
    {
      name: "tag-storage",
    }
  )
)