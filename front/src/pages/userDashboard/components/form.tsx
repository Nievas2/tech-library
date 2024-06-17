import { useFormik } from "formik"
import { librarySchema } from "@/utils/schemas/Library"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function FormAddLibrary() {
  const [tags, setTags] = useState<String[]>([])
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      link: "",
      tag: ""
    },
    validationSchema: librarySchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  function addTag() {
    const clonedTags = tags
    clonedTags.push(formik.values.tag)
    formik.setFieldValue("tag", "")
    setTags(clonedTags)
  }
  function removeTag(index: number) {
    const clonedTags = tags
    clonedTags.splice(index, 1)
    setTags(clonedTags)
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
          />
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
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-light dark:text-dark">Description</Label>
        </div>
        <div className="flex w-full items-center gap-1.5 mt-8">
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
        </div>
        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {tags.map((tag, index) => (
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
