import { Tag } from "./Tag"

export interface Library {
  id: number
  name: string
  description: string
  likes: number
  isActive: boolean
  state: "ACTIVE" | "PENDING" | "INACTIVE"
  createdBy: UserEntity
  tags: Tag[]
}

export interface UserEntity {
  id: number
  username: string
  password: string
  name: string
  lastname: string
  email: string
}
