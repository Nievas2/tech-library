import axiosInstance from "@/api/axiosInstance"
import { Library } from "@/interfaces/Library"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import axios, { AxiosResponse } from "axios"

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

// userId: number
export async function getLibraries(
  page: number,
  userId: number
): Promise<{ libraries: Library[]; totalPages: number }> {
  try {
    const response = await axiosInstance.get(
      `/library/all/active/${userId}?page=${page}`
    )
    return {
      libraries: response.data.data.results,
      totalPages: Math.ceil(response.data.data.total_pages)
    }
  } catch (error) {
    console.error("Error fetching libraries:", error)
    throw error
  }
}
export async function getLibrariesSearch(
  page: number,
  userId: number,
  tags: number[] | undefined
): Promise<{ libraries: Library[]; totalPages: number }> {
  try {
    const response = await axiosInstance.get(
      `/library/all/search/${userId}?page=${page}?tags=${tags?.toString}`
    )
    return {
      libraries: response.data.data.results,
      totalPages: Math.ceil(response.data.data.total_pages)
    }
  } catch (error) {
    console.error("Error fetching libraries:", error)
    throw error
  }
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
    return error
  }
}

export async function postLibrary(
  library: LibraryDtoUser,
  userId: number
): Promise<AxiosResponse<ResponseSuccess>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `http://localhost:8000/api/library/create/${userId}`,
      {
        name: library.name,
        description: library.description,
        link: library.link,
        tags: library.tags
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export function putLibraryUser(
  library: LibraryDtoUser,
  libraryId: number
): Promise<AxiosResponse<ResponseSuccess>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = axios.put(
      `http://localhost:8000/api/library/update/${libraryId}`,
      {
        library
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export function putLibraryAdmin(library: LibraryDtoAdmin, libraryId: number) {
  try {
    const response = axios.put(
      `http://localhost:8000/api/library/admin/update/${libraryId}`,
      {
        library
      }
    )
    return response
  } catch (error) {
    return error
  }
}
