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
import { LibraryDtoAdmin, putLibraryAdmin } from "@/services/LibraryService"
import { Tag } from "@/interfaces/Tag"
import { getTagsApi } from "@/services/TagService"
import { useToast } from "@/components/ui/use-toast"
import { ResponseSuccess } from "@/interfaces/responseSuccess"
import { AxiosError } from "axios"

interface CardProps {
  card: Library
}

export default function EditLibraryAdmin({ card }: CardProps) {
  const { toast } = useToast()
  const [tagsAdded, setTagsAdded] = useState<Tag[]>(
    card?.tags?.map((tag) => tag) || []
  )
  const [error, setError] = useState(false)

  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  const formik = useFormik({
    initialValues: {
      name: card?.name || "",
      description: card?.description || "",
      link: card?.link || "",
      state: card?.state || ""
    },
    validationSchema: librarySchema,
    onSubmit: (values) => {
      setError(false)

      const tagsId = tagsAdded.filter((tag) => tag.id).map((tag) => tag.id)
      const filteredTagsId = tagsId.filter((tag) => tag !== undefined)
      if (tagsId === undefined) return
      if (tagsAdded) {
        const valuesDate: LibraryDtoAdmin = {
          name: values.name,
          description: values.description,
          link: values.link,
          tags: filteredTagsId as number[],
          state: values.state
        }
        putLibraryFunction(valuesDate)
      }
    }
  })
  async function putLibraryFunction(valuesDate: LibraryDtoAdmin) {
    try {
      const response = await putLibraryAdmin(valuesDate, card.id)

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

  const editState = (value: string) => {
    formik.setFieldValue("state", value)
  }

  const addTag = (value: string) => {
    if (tagsAdded?.find((tag) => tag.name === value)) return

    const tagSelected = tags.find((tag: any) => tag.name === value)
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
          {...formik.getFieldProps("name")}
          type="text"
          placeholder="React"
          onChange={formik.handleChange}
          value={formik.values.name}
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
      <div className="grid w-full items-center gap-1.5">
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
      <div className="grid w-full items-center gap-1.5">
        <Label>Description</Label>
        <Textarea
          {...formik.getFieldProps("description")}
          placeholder="Description"
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
      <div className="flex w-full items-center gap-1.5 justify-between">
        <Select
          onValueChange={(value) => addTag(value)}
          disabled={loading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tags?.map((tag) => (
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
        <Select
          onValueChange={(value) => editState(value)}
          disabled={loading}
          defaultValue={formik.values.state}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a State" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row flex-wrap gap-2 text-sm mt-1">
        {tagsAdded.map((tag, index) => (
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
        id="submit"
        aria-label="Submit"
        role="button"
      >
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  )
}
