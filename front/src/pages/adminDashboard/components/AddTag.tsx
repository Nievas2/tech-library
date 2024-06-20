import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { tagSchema } from "@/utils/schemas/Tag"
import { Label } from "@radix-ui/react-label"
import { useFormik } from "formik"

const AddTag = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      bgColor: "#FF0000",
    },
    validationSchema: tagSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })
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
          <input
            type="color"
            className="bg-dark dark:bg-light"
            {...formik.getFieldProps("bgColor")}
          />
        </div>
        <div>
          <div className="flex mt-1">
            <h4
              key={crypto.randomUUID()}
              className={`px-2 py-1 rounded-lg font-extrabold text-stroke-dark dark:text-stroke-light`}
              style={{
                backgroundColor:
                  formik.values.bgColor == ""
                    ? "#FF0000"
                    : formik.values.bgColor
              }}
            >
              {formik.values.name == "" ? "Javascript" : formik.values.name}
            </h4>
          </div>
        </div>
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
export default AddTag
