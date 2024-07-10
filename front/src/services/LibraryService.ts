import axiosInstance from "@/api/axiosInstance"
import { Library } from "@/interfaces/Library"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import { AxiosResponse } from "axios"

export interface LibraryDtoUser {
  name: string
  description: string
  link: string
  tags: number[]
}
export interface LibraryDtoUserPut {
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

export async function getLibraries(
  page: number,
  userId: string
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

export async function getLibrariesFilter(
  page: number,
  userId: number,
  tags: string | undefined
): Promise<{ libraries: Library[]; totalPages: number }> {
  try {
    const response = await axiosInstance.get(
      `/library/all/search/${userId}?page=${page}&tags=${tags}`
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
  tags: string | undefined,
  search: string
): Promise<{ libraries: Library[]; totalPages: number }> {
  try {
    const response = await axiosInstance.get(
      `/library/all/search/${userId}?page=${page}&tags=${tags}&q=${search}`
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

export async function getLibrariesUserDashboard(userId: string) {
  try {
    const response = await axiosInstance.get(
      `/library/all/user/${userId}`
    )
    return response.data.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getAllLibraries(page: number) {
  try {
    const response = await axiosInstance.get(`/library/all?page=${page}`)
    return response.data.data
  } catch (error) {
    return error
  }
}

export async function postLibrary(
  library: LibraryDtoUser,
  userId: string
): Promise<AxiosResponse<ResponseSuccess>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post(
      `/library/create/${userId}`,
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
  library: LibraryDtoUserPut | LibraryDtoUser,
  libraryId: number
): Promise<AxiosResponse<ResponseSuccess>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = axiosInstance.put(
      `/library/update/${libraryId}`,
      {
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

export function putLibraryAdmin(library: LibraryDtoAdmin, libraryId: number) {
  try {
    const response = axiosInstance.put(
      `/library/admin/update/${libraryId}`,
      {
        library
      }
    )
    return response
  } catch (error) {
    return error
  }
}