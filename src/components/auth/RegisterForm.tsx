"use client"

import { FormProvider, useForm } from "react-hook-form"
// Adaptador para que React Hook Form use validaciones con Yup
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup" // Librería de validación por esquema

import SubmitButton from "../form/SubmitButton"
import InputText from "../form/InputText"

// Tipo que define los campos del formulario
type FormData = {
    username: string,
    password: string,
    name: string,
    photoUrl: string,
}

// Defino el esquema de validación con Yup
const schema = yup.object({
    username: yup.string().required(),     // obligatorio
    password: yup.string().required(),     // obligatorio
    name: yup.string().required(),         // obligatorio
    photoUrl: yup.string().required(),     // obligatorio
}).required()

const RegisterForm = () => {

    // Inicializo el form con los métodos de React Hook Form
    // - useForm devuelve métodos útiles como register, handleSubmit, formState, etc.
    // - Le paso yupResolver(schema) para que use Yup en la validación
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    // Extraigo lo que voy a usar directamente (opcional)
    const { register, handleSubmit, formState: { errors } } = methods

    // Esta función se ejecuta solo si la validación pasó
    const onSubmit = (data: FormData) => {
        console.log(JSON.stringify(data));
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
                </form>

            </FormProvider>
        </div>
    );
};

export default RegisterForm;
