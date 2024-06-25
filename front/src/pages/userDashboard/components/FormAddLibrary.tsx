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
import { useState } from "react"
import { Library } from "@/interfaces/Library"
import { Textarea } from "@/components/ui/textarea"
import { useTagStore } from "@/stores"
import { LibraryDtoCreate, postLibrary } from "@/services/LibraryService"
import { Tag } from "@/interfaces/Tag"

interface CardProps {
  card: Library | undefined
}

export default function FormAddLibrary({ card }: CardProps) {
  const tags = useTagStore((state) => state.tags)
  
  const [tagsAdded, setTagsAdded] = useState<Tag[]>([]);

  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: card?.name || "",
      description: card?.description || "",
      link: card?.link || ""
    },
    validationSchema: librarySchema,
    onSubmit: (values) => {
      if (tagsAdded?.length === 0) return setError(true)
      setError(false)
      if (tagsAdded) {
        const valuesDate: LibraryDtoCreate = {
          name: values.name,
          description: values.description,
          link: values.link,
          tags: tagsAdded
        }
        console.log(valuesDate)
        postLibrary(valuesDate, 1)
      }
    }
  })

  const addTag = (value: string) => {
    if (tagsAdded?.find((tag) => tag.name === value)) return
    const tagSelected = tags.find((tag) => tag.name === value)
    if (!tagSelected) return
    console.log(tagSelected);
    
    const tagSelectedFormat = {
      id: tagSelected.id,
      name: tagSelected.name,
      color: tagSelected.color
    }
    setTagsAdded([...tagsAdded, tagSelectedFormat])
    if (error) setError(false)
  }

  const removeTag = (index: number) => {
    const clonedTags = [...(tagsAdded || [])];

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
          maxLength={100}
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
          maxLength={100}
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
        <Select onValueChange={(value) => addTag(value)}>
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
      >
        Submit
      </Button>
    </form>
  )
}
