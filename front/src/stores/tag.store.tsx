import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface Tag {
  id: number
  name: string
  selected: boolean
  color: string
}

interface TagState {
  tags: Tag[]
  activeTag: (tagId: number) => void
}

const storeApi: StateCreator<TagState, [["zustand/immer", never]]> = (set) => ({
  tags: [
    {
      id: 1,
      name: "javascript",
      selected: false,
      color: "#f7df1e"
    },
    {
      id: 2,
      name: "typescript",
      selected: false,
      color: "#3178c6"
    },
    {
      id: 3,
      name: "react",
      selected: false,
      color: "#61dafb"
    },
    {
      id: 4,
      name: "nextjs",
      selected: false,
      color: "#000000"
    },
    {
      id: 5,
      name: "nodejs",
      selected: false,
      color: "#339933"
    },
    {
      id: 6,
      name: "graphql",
      selected: false,
      color: "#e10098"
    },
    {
      id: 7,
      name: "tailwindcss",
      selected: false,
      color: "#38b2ac"
    },
    {
      id: 8,
      name: "tailwindui",
      selected: false,
      color: "#38b2ac"
    }
  ],

  activeTag: (tagId: number) => {
    set((state) => {
      const tag = state.tags.find((tag) => tag.id === tagId)
      if (tag) {
        tag.selected = !tag.selected
      }
    })
  }
})

export const useTagStore = create<TagState>()(
  persist(immer(storeApi), {
    name: "tag-storage"
  })
)
