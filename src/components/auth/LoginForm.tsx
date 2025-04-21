"use client"

import { FormProvider, useForm } from "react-hook-form"
// Adaptador que conecta Yup con React Hook Form
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup" // Librería para validaciones por esquema

import SubmitButton from "../form/SubmitButton"
import InputText from "../form/InputText"
import httpExternalApi from "@/services/common/http.external.service"
import authApi from "@/services/auth/auth.service"
import { AccessDeniedError } from "@/services/common/errors"
import { useState } from "react"
import { useRouter } from "next/navigation"

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

    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)

    // Inicializo React Hook Form con Tipado y validación con Yup
    const methods = useForm<FormData>({
        resolver: yupResolver(schema), // Le paso el esquema para que se use en las validaciones
    })

    // handleSubmit se encarga de correr la validación y ejecutar onSubmit si está todo ok
    const { handleSubmit } = methods

    // Esta función se ejecuta si los datos pasan la validación
    const onSubmit = async (data: FormData) => {
        setServerError(null)
        try {
            const loginResponse = await authApi.login(data.username, data.password)
            console.log(loginResponse)
            router.push("/")
        } catch (error) {
            if (error instanceof AccessDeniedError) {
                setServerError("Las credenciales ingresadas son inválidas.")
            } else {
                setServerError("Ha ocurrido un error. Intente nuevamente más tarde.")
            }
        }
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
                    {serverError && 
                    <div  className="text-red-600 mt-4">{serverError}</div>
                    }
                </form>
            </FormProvider>
        </div>
    )
}

export default LoginForm
