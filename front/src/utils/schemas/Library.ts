import * as yup from "yup"
export const librarySchema = yup.object({
  name: yup.string().required("El nombre es requerido").max(20, "El nombre es demasiado largo"),
  description: yup.string().required("La descriction es requerido").max(600, "La descripcion es demasiado larga").min(4, "La description es demasiado corta"),
  link: yup.string().url().required("El link es requerido").max(100, "El link es demasiado largo"),
})
