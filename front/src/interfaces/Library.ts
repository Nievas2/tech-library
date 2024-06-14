export interface Library {
  id: number
  name: string
  description: string
  likes: number
  isActive: boolean
  state: "ACTIVE" | "PENDING" | "INACTIVE"
  createdBy: UserEntity
  tags: TagEntity[]
}
export interface TagEntity {
  id: number
  name: string
}
export interface UserEntity {
  id: number
  username: string
  password: string
  name: string
  lastname: string
  email: string
}
