import * as yup from "yup"

export const tagSchema = yup.object({
  name: yup.string().required("El nombre es requerido").max(20, "El nombre es demasiado largo"),
  color: yup
    .string()
    .required("El color de fondo es requerido")
    .max(20, "El color de fondo es demasiado largo")
})
