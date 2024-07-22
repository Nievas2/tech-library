import { useFormik } from "formik"
import { librarySchema } from "@/utils/schemas/Library"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react"
import { Library } from "@/interfaces/Library"
import { Textarea } from "@/components/ui/textarea"
import {
  LibraryDtoUser,
  postLibrary,
  putLibraryUser
} from "@/services/LibraryService"
import { Tag } from "@/interfaces/Tag"
import { useToast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import { getTagsApi } from "@/services/TagService"
import { useAuthContext } from "@/contexts"

interface CardProps {
  card: Library | undefined
}

export default function FormAddLibrary({ card }: CardProps) {
  const { toast } = useToast()
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthContext()

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTagsApi()

        setTags(tags)
      } catch (error) {
        console.error("Error fetching tags", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  const [tagsAdded, setTagsAdded] = useState<Tag[]>(
    card?.tags?.map((tag) => tag) || []
  )

  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: card?.name || "",
      description: card?.description || "",
      link: card?.link || ""
    },
    validationSchema: librarySchema,
    onSubmit: async (values) => {
      if (tagsAdded.length === 0) {
        return setError(true)
      }
      setError(false)

      const tagsId = tagsAdded.map((tag) => tag.id)
      const valuesData: LibraryDtoUser = {
        name: values.name,
        description: values.description,
        link: values.link,
        tags: tagsId
      }

      if (card) {
        await handleUpdateLibrary(valuesData, card.id)
      } else {
        await handleCreateLibrary(valuesData)
      }
    }
  })

  const handleUpdateLibrary = async (values: LibraryDtoUser, id: number) => {
    try {
      const response = await putLibraryUser(values, id)
      toast({ title: response.data.statusMessage })
      window.location.reload()
    } catch (error) {
      toast({
        title: (error as AxiosError<ResponseSuccess>).response?.data
          .statusMessage
      })
    }
  }

  const handleCreateLibrary = async (values: LibraryDtoUser) => {
    try {
      const response = await postLibrary(values, authUser!.user.id)
      toast({ title: response.data.statusMessage })
      window.location.reload()
    } catch (error) {
      toast({
        title: (error as AxiosError<ResponseSuccess>).response?.data
          .statusMessage
      })
    }
  }

  const addTag = useCallback(
    (value: string) => {
      if (tagsAdded.find((tag) => tag.name === value)) return

      const tagSelected = tags.find((tag) => tag.name === value)
      if (!tagSelected) return

      setTagsAdded([...tagsAdded, tagSelected])
      if (error) setError(false)
    },
    [tags, tagsAdded, error]
  )

  const removeTag = useCallback(
    (index: number) => {
      setTagsAdded(tagsAdded.filter((_, i) => i !== index))
    },
    [tagsAdded]
  )

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="React"
            {...formik.getFieldProps("name")}
            className="bg-light"
            maxLength={20}
            disabled={loading}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="font-bold text-[#ff4444]">
              {formik.errors.name}
            </small>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Link</Label>
          <Input
            type="text"
            placeholder="https://es.react.dev/"
            {...formik.getFieldProps("link")}
            className="bg-light"
            maxLength={200}
            disabled={loading}
          />
          {formik.touched.link && formik.errors.link && (
            <small className="font-bold text-[#ff4444]">
              {formik.errors.link}
            </small>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            {...formik.getFieldProps("description")}
            className="bg-light"
            maxLength={200}
            disabled={loading}
          />
          {formik.touched.description && formik.errors.description && (
            <small className="font-bold text-[#ff4444]">
              {formik.errors.description}
            </small>
          )}
        </div>

        {/* <div className="flex flex-col w-full gap-2.5"> */}
        <div className={`flex flex-col w-full ${error ? 'gap-2' : 'gap-2.5'}`}>
          <Select onValueChange={addTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tags.map((tag) => (
                  <SelectItem
                    key={tag.id}
                    value={tag.name}
                  >
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {tagsAdded.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 text-sm">
              {tagsAdded.map((tag, index) => (
                <div
                  key={tag.id}
                  className="flex gap-1 px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light border border-dark dark:border-light"
                >
                  <h4>{tag.name}</h4>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                  >
                    <Icon
                      icon="material-symbols:close"
                      width="16"
                      height="16"
                      className="text-dark dark:text-light"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <small className="font-bold text-[#ff4444]">
              Add at least one tag
            </small>
          )}
        </div>
      </div>

      <Button
        variant="marketing"
        className="p-1"
        type="submit"
        id="submit"
        aria-label="Submit"
        role="button"
        disabled={loading}
      >
        Submit
      </Button>
    </form>
  )
}
