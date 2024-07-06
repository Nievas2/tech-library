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
import { useEffect, useState } from "react"
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
  const [tags, setTags] = useState<any[]>([])
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
      if (card === undefined) {
        if (tagsAdded?.length === 0) return setError(true)
        setError(false)
        const tagsId = tagsAdded.filter((tag) => tag.id).map((tag) => tag.id)
        const filteredTagsId = tagsId.filter((tag) => tag !== undefined)

        if (tagsAdded) {
          const valuesDate: LibraryDtoUser = {
            name: values.name,
            description: values.description,
            link: values.link,
            tags: filteredTagsId as number[]
          }
          postLibraryFunction(valuesDate, authUser!.user.id)
        }
      } else {
        setError(false)

        const tagsId = tagsAdded.filter((tag) => tag.id).map((tag) => tag.id)
        const tagsIdCard = card.tags
          ?.filter((tag) => tag.id)
          .map((tag) => tag.id)
        tagsIdCard?.forEach((tag) => {
          tagsId.push(tag)
        })
        const filteredTagsId = tagsId.filter((tag) => tag !== undefined)

        if (tagsAdded) {
          const valuesDate: LibraryDtoUser = {
            name: values.name,
            description: values.description,
            link: values.link,
            tags: filteredTagsId as number[]
          }
          putLibraryFunction(valuesDate, card.id)
        }
      }
    }
  })

  async function putLibraryFunction(values: LibraryDtoUser, id: number) {
    try {
      let data

      if (values.name === card?.name) {
        data = {
          description: values.description,
          link: values.link,
          tags: values.tags
        }
      } else {
        data = values
      }

      const response = await putLibraryUser(data, id)
      toast({
        title: response.data.statusMessage
      })
      window.location.reload()
    } catch (error) {
      toast({
        title: (error as AxiosError<ResponseSuccess>).response?.data
          .statusMessage
      })
    }
  }

  async function postLibraryFunction(values: LibraryDtoUser, id: string) {
    try {
      const response = await postLibrary(values, id)
      toast({
        title: response.data.statusMessage
      })
      window.location.reload()
    } catch (error) {
      toast({
        title: (error as AxiosError<ResponseSuccess>).response?.data
          .statusMessage
      })
    }
  }

  const addTag = (value: string) => {
    if (tagsAdded?.find((tag) => tag.name === value)) return
    const tagSelected = tags.find((tag) => tag.name === value)
    if (!tagSelected) return

    const tagSelectedFormat = {
      id: tagSelected.id,
      name: tagSelected.name,
      color: tagSelected.color
    }
    setTagsAdded([...tagsAdded, tagSelectedFormat])
    if (error) setError(false)
  }

  const removeTag = (index: number) => {
    const clonedTags = [...(tagsAdded || [])]

    clonedTags.splice(index, 1)
    setTagsAdded(clonedTags)
  }

  return (
    <form
      className="flex flex-col gap-2 mt-1"
      onSubmit={formik.handleSubmit}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="React"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="bg-light"
          maxLength={20}
          disabled={loading}
        />
        <small
          className={`${
            formik.touched.name && formik.errors.name ? "text-[#FF0000]" : ""
          }`}
        >
          {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
        </small>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Link</Label>
        <Input
          id="link"
          name="link"
          type="text"
          placeholder="https://es.react.dev/"
          onChange={formik.handleChange}
          value={formik.values.link}
          className="bg-light"
          maxLength={200}
          disabled={loading}
        />
        <small
          className={`${
            formik.touched.link && formik.errors.link ? "text-[#FF0000]" : ""
          }`}
        >
          {formik.touched.link && formik.errors.link ? formik.errors.link : ""}
        </small>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="bg-light"
          maxLength={200}
          disabled={loading}
        />
        <small
          className={`${
            formik.touched.description && formik.errors.description
              ? "text-[#FF0000]"
              : ""
          }`}
        >
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : ""}
        </small>
      </div>
      <div className="flex w-full items-center gap-1.5">
        <Select
          onValueChange={(value) => addTag(value)}
          disabled={loading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tags &&
                tags?.map((tag) => (
                  <SelectItem
                    key={crypto.randomUUID()}
                    value={tag.name}
                  >
                    {tag.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row flex-wrap gap-2 text-sm mt-1">
        {tagsAdded?.map((tag, index) => (
          <div
            key={crypto.randomUUID()}
            className="flex gap-1 px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light border border-dark dark:border-light"
          >
            <h4>{tag.name}</h4>
            <button
              className="w-[16px]"
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
      <small className="text-[#FF0000]">
        {error ? "Add at least one tag" : ""}
      </small>
      <Button
        variant={"marketing"}
        className="p-1"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  )
}
