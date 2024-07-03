import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface TokenState {
  token: string
  setToken: (token: string) => void
  logOut: () => void
}
const storeApi: StateCreator<TokenState, [["zustand/immer", never]]> = (set) => ({
  token: "",
  setToken: (token: string) => {
    set({ token })
  },
  
  logOut: () => {
    set({ token: "" })
  }
})
export const useTokenStore = create<TokenState>()(
  persist(immer(storeApi), {
    name: "token-storage"
  })
)
