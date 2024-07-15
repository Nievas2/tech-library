import * as yup from "yup"

export const signupSchema = yup.object({
  username : yup.string().required("Username is required").min(3, "Username must be at least 3 characters").max(10, "Username cannot contain more than 10 characters"),
  email    : yup.string().required("Email is required").email("Invalid email format"),
  password : yup.string().required("Password is required").min(5, "Password must be at least 5 characters").max(30, "Password cannot contain more than 30 characters"),
  confirmPassword: yup.string().required("Confirm Password is required"),
  // confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
})