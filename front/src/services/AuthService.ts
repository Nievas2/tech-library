import axiosInstance from "@/api/axiosInstance"

export interface Login {
  username: string
  password: string
}
export interface Register {
  username: string
  email: string
  password: string
}
export function login(user: Login) {
  try {
    const response = axiosInstance.post("/login", user)
    return response
  } catch (error) {
    throw error
  }
}
export function register(user: Register) {
  try {
    const response = axiosInstance.post("/register", user)
    return response
  } catch (error) {
    throw error
  }
}
