import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { deleteTag, postTag, putTag } from "@/services/TagService"
import { Tag } from "@/stores"
import { tagSchema } from "@/utils/schemas/Tag"
import { Label } from "@radix-ui/react-label"
import { useFormik } from "formik"
import InputColor from "react-input-color"
interface ChangeTagProps {
  tag: Tag | undefined
}
const ChangeTag = ({ tag }: ChangeTagProps) => {
  const { toast } = useToast()
  const formik = useFormik({
    initialValues: {
      name: tag ? tag.name : "",
      color: tag ? tag.color : "#ff0000ff"
    },
    validationSchema: tagSchema,
    onSubmit: async (values) => {
      if (tag === undefined) {
        const response = await postTag(values)
        toast({
          title: response.data.statusMessage
        })
        if(response.data.status){
          window.location.reload()
        }
      }
      if (tag != undefined) {
        await putTag(values, tag?.id)
        window.location.reload()
      }
    }
  })
  function handleDeleteTag() {
    if (!tag) return
    deleteTag(tag?.id)
  }
  return (
    <div>
      <form
        className="flex flex-col gap-1"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Javascript"
            className="dark:text-[#000] dark:bg-light "
            {...formik.getFieldProps("name")}
          />
        </div>
        <div className="grid items-center gap-1.5">
          <Label>Background Color</Label>
          <InputColor
            onChange={(value) => formik.setFieldValue("color", value.hex)}
            initialValue={formik.values.color}
            placement="top"
          />
        </div>
        <div>
          <div className="flex mt-1">
            <h4
              key={crypto.randomUUID()}
              className={`px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light`}
              style={{
                backgroundColor:
                  formik.values.color == "" ? "#ff0000ff" : formik.values.color
              }}
            >
              {formik.values.name == "" ? "Javascript" : formik.values.name}
            </h4>
          </div>
        </div>
        {tag && (
          <Button
            variant={"destructive"}
            onClick={handleDeleteTag}
            type="button"
          >
            Delete
          </Button>
        )}

        <Button
          variant={"marketing"}
          className="p-1 mt-4"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
export default ChangeTag
