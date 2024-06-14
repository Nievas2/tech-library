import * as yup from "yup"
export const librarySchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  link: yup.string().required("Link is required"),
  tag: yup.string(),
})
