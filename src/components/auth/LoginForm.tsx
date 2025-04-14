"use client"

import { FormProvider, useForm } from "react-hook-form"
// Adaptador que conecta Yup con React Hook Form
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup" // Librería para validaciones por esquema

import SubmitButton from "../form/SubmitButton"
import InputText from "../form/InputText"

// Tipo que define los campos del formulario
type FormData = {
    username: string;
    password: string;
}

// Armo el esquema de validación con Yup
const schema = yup
    .object({
        username: yup.string().required(), // campo obligatorio
        password: yup.string().required(), // campo obligatorio
    })
    .required()

const LoginForm = () => {
    // Inicializo React Hook Form con Tipado y validación con Yup
    const methods = useForm<FormData>({
        resolver: yupResolver(schema), // Le paso el esquema para que se use en las validaciones
    })

    // handleSubmit se encarga de correr la validación y ejecutar onSubmit si está todo ok
    const { handleSubmit } = methods

    // Esta función se ejecuta si los datos pasan la validación
    const onSubmit = (data: FormData) => {
        console.log(JSON.stringify(data))
    }

    return (
        <div className="flex items-center w-full flex-col">
            <h1 className="my-4 text-left">Iniciar sesión</h1>

            {/* FormProvider permite que los componentes hijos usen useFormContext */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        label={"Nombre de usuario"}
                        fieldName={"username"}
                        placeholder="Nombre de usuario"
                        type="text"
                    />

                    <InputText
                        label={"Contraseña"}
                        fieldName={"password"}
                        placeholder="Contraseña"
                        type="password"
                    />

                    <SubmitButton
                        label={"Ingresar"}
                        onSubmit={onSubmit}
                        styles=""
                    />
                </form>
            </FormProvider>
        </div>
    )
}

export default LoginForm
