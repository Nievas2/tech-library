import * as yup from "yup"

export const signupSchema = yup.object({
  username : yup.string().required("El nombre de usuario es requerido").min(3, "El nombre de usuario debe tener al menos 3 caracteres").max(10, "El nombre de usuario no puede tener más de 10 caracteres"),
  email    : yup.string().required("Email is required").email("Invalid email format"),
  password : yup.string().required("Password is required").min(5, "La contraseña debe tener al menos 5 caracteres").max(30, "La contraseña no puede tener más de 30 caracteres"),
  confirmPassword: yup.string().required("Confirme su contraseña"),
})