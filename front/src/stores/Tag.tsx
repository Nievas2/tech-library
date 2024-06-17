
import { create } from "zustand"


interface TagState {
 id: number
 name: string
 selected: boolean
}

interface State {
  tags: TagState[] | undefined

  activeTag: (tagId: number) => void
  
  
}

export const useTags = create<State>((set, get) => {
  return {
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
      const { tags } = get()
      const newTag = structuredClone(tags)
      newTag?.map((tag) => {
        if (tagId === tag.id) {
          tag.selected = !tag.selected
        }
      })
      set({ tags: newTag })
    },

  }
})
