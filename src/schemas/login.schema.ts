import * as yup from "yup" // Librería para validaciones por esquema

export const LoginSchema = yup
.object({
    username: yup.string().required(), // campo obligatorio
    password: yup.string().required(), // campo obligatorio
})
.required()

