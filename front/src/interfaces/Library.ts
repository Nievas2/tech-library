import { Tag } from "./Tag"
import { User } from "./User"

export interface Library {
  id: number
  name: string
  description: string
  link: string
  liked: boolean
  isActive: boolean
  state: "ACTIVE" | "PENDING" | "INACTIVE"
  createdBy: User
  createdAt: string;
  tags?: Tag[]
  likesCount?: number
}
