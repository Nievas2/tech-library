import * as yup from "yup"

export const loginSchema = yup.object({
  username : yup.string().required("Username is required"),
  password : yup.string().required("Password is required"),
})