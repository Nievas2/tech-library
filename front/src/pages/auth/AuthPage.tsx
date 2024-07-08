import { AuthUser, useAuthContext } from "@/contexts"
import { useEffect } from "react"

const AuthPage = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const { setAuthUser } = useAuthContext()

  async function loginFunction() {
    const token = searchParams.get("token")
    const user = searchParams.get("user")
    if (token === null || user === null) return

    localStorage.setItem("user-token", token)

    const decodedData = decodeURIComponent(user)
    const data = await JSON.parse(decodedData)

    const userObjet: AuthUser = {
      user: data,
      token
    }
    localStorage.setItem("library-user", JSON.stringify(userObjet))
    setAuthUser(userObjet)
    window.location.href = "/home"
  }
  useEffect(() => {
    loginFunction()
  }, [])
  return <div>AuthPage</div>
}
export default AuthPage
