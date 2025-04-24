"use client"

import { FormProvider, useForm } from "react-hook-form"
// Adaptador para que React Hook Form use validaciones con Yup
import { yupResolver } from "@hookform/resolvers/yup"

import SubmitButton from "../form/SubmitButton"
import InputText from "../form/InputText"
import { RegisterSchema } from "@/schemas/register.schema"
import authApi from "@/services/auth/auth.api"
import { ConflictError } from "@/services/common/errors"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Tipo que define los campos del formulario
type FormData = {
    username: string,
    password: string,
    name: string,
    photoUrl: string,
}


const RegisterForm = () => {

    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)
    

    const methods = useForm<FormData>({
        resolver: yupResolver(RegisterSchema)
    })

    // Extraigo lo que voy a usar directamente (opcional)
    const { register, handleSubmit, formState: { errors } } = methods

    // Esta función se ejecuta solo si la validación pasó
    const onSubmit = async (data: FormData) => {
        setServerError(null)
        try {
            const loginResponse = await authApi.register(data.username, data.password, data.name, data.photoUrl)
            console.log(loginResponse)
            router.push("/")
            router.refresh()
        } catch (error) {
            if (error instanceof ConflictError) {
                setServerError("El nombre de usuario ya existe.")
            } else {
                setServerError("Ha ocurrido un error. Intente nuevamente más tarde.")
            }
        }
    }

    return (
        <div className="flex items-center w-full flex-col">
            <h1 className="my-4 text-left">Iniciar sesión</h1>

            {/* FormProvider permite que los componentes internos accedan al contexto del form */}
            <FormProvider {...methods}>

                {/* handleSubmit valida usando el resolver y luego ejecuta onSubmit */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        label={"Nombre"}
                        fieldName={"name"}
                        placeholder="Nombre"
                        type="text" />

                    <InputText
                        label={"Nombre de usuario"}
                        fieldName={"username"}
                        placeholder="Nombre de usuario"
                        type="text" />

                    <InputText
                        label={"URL de la imagen de perfil"}
                        fieldName={"photoUrl"}
                        placeholder="https://..."
                        type="text" />

                    <InputText
                        label={"Contraseña"}
                        fieldName={"password"}
                        placeholder="Contraseña"
                        type="password" />

                    <SubmitButton
                        label={"Registrarse"}
                        onSubmit={onSubmit} />
                    {serverError && <div  className="text-red-600 mt-4">{serverError}</div>}
                </form>

            </FormProvider>
        </div>
    );
};

export default RegisterForm;
