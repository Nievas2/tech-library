import axios from "axios"

export interface LibraryDtoUser {
  name: string
  description: string
  link: string
  tags: number[]
}
export interface LibraryDtoAdmin {
  name: string
  description: string
  link: string
  tags: number[]  
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
export async function getLibrariesUserDashboard(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/library/all/user/${userId}`
    )
    return response.data.data
  } catch (error) {
    console.log(error)
    return null
  }
}
export async function getAllLibraries() {
  try {
    const response = await axios.get(`http://localhost:8000/api/library/all`)
    return response.data.data.results
  } catch (error) {
    console.log(error)
    return null
  }
}
export function postLibrary(library: LibraryDtoUser, userId: number) {
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

export function putLibraryUser(library: LibraryDtoUser, libraryId: number) {
  axios
    .put(`http://localhost:8000/api/library/update/${libraryId}`, {
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
export function putLibraryAdmin(library: LibraryDtoAdmin, libraryId: number) {
  axios
    .put(`http://localhost:8000/api/library/admin/update/${libraryId}`, {
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
