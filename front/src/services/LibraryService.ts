import { Tag } from "@/interfaces/Tag"
import axios from "axios"

export interface LibraryDtoCreate {
  name: string
  description: string
  link: string
  tags: Tag[]
}
export interface LibraryDtoUpdate {
    name: string
    description: string
    link: string
    tags: Tag[]
    state: "ACTIVE" | "PENDING" | "INACTIVE"
  }
export function getLibraries(userId: number) {
  axios
    .get(`http://localhost:8000/api/library/all/active/${userId}`)
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
export function getAllLibraries() {
  axios
    .get(`http://localhost:8000/api/library/all`)
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
export function postLibrary(library: LibraryDtoCreate, userId: number) {
  axios
    .post(`http://localhost:8000/api/library/create/${userId}`, {
      name: library.name,
      description: library.description,
      link: library.link,
      tags: library.tags
    })
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export function putLibraryState(library: LibraryDtoUpdate, libraryId: number) {
  axios
    .post(`http://localhost:8000/api/library/update/${libraryId}`, {
      library
    })
    .then((response) => {
      console.log(response)

      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}