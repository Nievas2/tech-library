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
  name: string
  description: string
  link: string
  tags: number[]
}
export interface LibraryDtoAdmin {
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

export async function getLibrariesUserDashboard(userId: string, page: number) {
  try {
    const response = await axiosInstance.get(
      `/library/all/user/${userId}?page=${page}`
    )
    return response.data.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getAllLibraries(page: number) {
  try {
    const response = await axiosInstance.get(`/library/all?currentPage=${page}`)
    return response.data.data
  } catch (error) {
    return error
  }
}

export async function getLibrariesByStateAdmin(
  state: string,
  page: number
): Promise<AxiosResponse<ResponseSuccess>> {
  try {
    let response
    if (state === "all") {
      response = await axiosInstance.get(`/library/all?page=${page}`)
    } else {
      response = await axiosInstance.get(
        `/library/all/status/${state}?page=${page}`
      )
    }
    return response.data
  } catch (error) {
    throw error
  }
}
export async function getLibrariesByStateUser(
  state: string,
  page: number,
  userId: string
): Promise<AxiosResponse<ResponseSuccess>> {
  try {
    let response = await axiosInstance.get(
        `/library/all/user/${userId}?state=${state}&currentPage=${page}`
      )
    return response.data
  } catch (error) {
    throw error
  }
}
export async function postLibrary(
  library: LibraryDtoUser,
  userId: string
): Promise<AxiosResponse<ResponseSuccess>> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post(`/library/create/${userId}`, {
      name: library.name,
      description: library.description,
      link: library.link,
      tags: library.tags
    })
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
    const response = axiosInstance.put(`/library/update/${libraryId}`, {
      description: library.description,
      link: library.link,
      tags: library.tags
    })
    return response
  } catch (error) {
    throw error
  }
}

export function putLibraryAdmin(
  library: LibraryDtoAdmin,
  libraryId: number
): Promise<AxiosResponse<ResponseSuccess>> {

  try {
    const response = axiosInstance.put(`/library/admin/update/${libraryId}`, {
      description: library.description,
      link: library.link,
      tags: library.tags,
      state: library.state
    })
    return response
  } catch (error) {
    throw error
  }
}
