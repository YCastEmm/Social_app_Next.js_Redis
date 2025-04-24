import * as yup from "yup" // Librería para validaciones por esquema

// Defino el esquema de validación con Yup
export const RegisterSchema = yup.object({
    username: yup.string().required(),     // obligatorio
    password: yup.string().required(),     // obligatorio
    name: yup.string().required(),         // obligatorio
    photoUrl: yup.string().required(),     // obligatorio
}).required()
