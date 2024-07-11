import axiosInstance from "@/api/axiosInstance"
import { Tag } from "@/stores"

interface TagDto {
  name  : string
  color : string
}

export async function getTagsApi(): Promise<Tag[]> {
  try {
    const response = await axiosInstance.get<{ data: Tag[] }>("/tag/all")
    return response.data.data
  } catch (error) {
    console.error("Error fetching tags", error)
    throw error
  }
}

export function postTag(tag: TagDto) {
  try {
    const response = axiosInstance
    .post("/tag/create", {
      name: tag.name,
      color: tag.color
    })
    return response
  } catch (error) {
    throw error
  }
  
}

export function putTag(tag: TagDto, tagId: number) {
  try {
    const response = axiosInstance.put(`/tag/update/${tagId}`, {
      tag
    })
    return response
  } catch (error) {
    throw error
  }
  axiosInstance
    
}

export function deleteTag(tagId: number) {
  axiosInstance
    .delete(`/tag/delete/${tagId}`)
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}
