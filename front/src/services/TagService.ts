import { Tag } from "@/interfaces/Tag"
import axios from "axios"

interface TagDto {
  name: string
  color: string
}
export function getTags() {
  axios
    .get("http://localhost:8000/api/tag/all")
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export function postTag(tag: Tag) {
  console.log(tag)

  axios
    .post("http://localhost:8000/api/tag/create", {
      name: tag.name,
      color: tag.color
    })
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
export function putTag(tag: TagDto, tagId: number) {
  axios
    .put(`http://localhost:8000/api/tag/update/${tagId}`, {
      tag
    })
    .then((response) => {
      console.log(response)

      return response.data.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}
export function deleteTag(tagId: number) {
  axios
    .delete(`http://localhost:8000/api/tag/delete/${tagId}`)
    .then((response) => {
      console.log(response)

      return response.data.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}
