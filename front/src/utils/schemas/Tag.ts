import * as yup from "yup"

export const tagSchema = yup.object({
  name: yup.string().required("Name is required").max(20, "Name is too long"),
  bgColor: yup
    .string()
    .required("Background color is required")
    .max(20, "Background color is too long")
})
