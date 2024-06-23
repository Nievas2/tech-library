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
  tags: [
    {
      id: 1,
      name: "javascript",
      selected: false
    },
    {
      id: 2,
      name: "typescript",
      selected: false
    },
    {
      id: 3,
      name: "react",
      selected: false
    },
    {
      id: 4,
      name: "nextjs",
      selected: false
    },
    {
      id: 5,
      name: "nodejs",
      selected: false
    },
    {
      id: 6,
      name: "graphql",
      selected: false
    },
    {
      id: 7,
      name: "tailwindcss",
      selected: false
    },
    {
      id: 8,
      name: "tailwindui",
      selected: false
    },
  ],
  
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