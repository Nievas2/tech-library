import { useFormik } from "formik"
import { librarySchema } from "@/utils/schemas/Library"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useTags } from "@/stores/Tag"
export default function FormAddLibrary() {
  const tags = useTags((state) => state.tags)
  const [tagsAdded, setTagsAdded] = useState<string[]>([])
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      link: ""
    },
    validationSchema: librarySchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  function addTag(value: string) {
    const clonedTags = tagsAdded
    clonedTags.push(value)
    setTagsAdded(clonedTags)
  }
  function removeTag(index: number) {
    const clonedTags = tagsAdded
    clonedTags.splice(index, 1)
    setTagsAdded(clonedTags)
  }
  return (
    <section>
      <form
        className="flex flex-col p-2 gap-1"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="name"
            className=" text-light dark:text-dark"
          >
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
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
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : ""}
          </small>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-light dark:text-dark">Link</Label>
          <Input
            id="link"
            name="link"
            type="text"
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
            {formik.touched.link && formik.errors.link
              ? formik.errors.link
              : ""}
          </small>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-light dark:text-dark">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
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
        {/*  <div className="flex w-full items-center gap-1.5 mt-8">
          <Input
            id="tag"
            name="tag"
            onChange={formik.handleChange}
            value={formik.values.tag}
            className="bg-light"
          />
          <Button
            onClick={addTag}
            type="button"
            className="p-1"
            variant={"secondary"}
          >
            Add tag
          </Button>
        </div> */}
        <div className="flex w-full items-center gap-1.5 mt-8">
          <Input
            id="tag"
            name="tag"
            onChange={formik.handleChange}
            value={formik.values.tag}
            className="bg-light"
          />
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
                {/* <SelectItem value="all">All</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {tagsAdded.map((tag, index) => (
            <div
              key={crypto.randomUUID()}
              className="flex gap-1 px-2 py-1 rounded-lg border font-extrabold text-stroke-dark dark:text-stroke-light "
            >
              <h4>{tag}</h4>
              <button onClick={() => removeTag(index)}>
                <Icon
                  icon="material-symbols:close"
                  width="16"
                  height="16"
                  color="#000"
                />
              </button>
            </div>
          ))}
        </div>

        <Button
          variant={"secondary"}
          className="p-1 mt-4"
          type="submit"
        >
          Submit
        </Button>
        {/* <Card card="test" />  */}
      </form>
    </section>
  )
}
