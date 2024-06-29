import * as yup from "yup"
export const librarySchema = yup.object({
  name: yup.string().required("Name is required").max(20, "Name is too long"),
  description: yup.string().required("Description is required").max(200, "Description is too long").min(4, "Description is too short"),
  link: yup.string().url().required("Link is required").max(100, "Link is too long"),
})
