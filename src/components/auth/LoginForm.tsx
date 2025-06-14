"use client"

import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useState } from "react"

import InputText from "../form/InputText"
import { LoginSchema } from "@/schemas/login.schema"
import authApi from "@/services/auth/auth.api"
import { AccessDeniedError } from "@/services/common/errors"

type FormData = {
    username: string
    password: string
}

const LoginForm = () => {
    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const methods = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
    })

    const { handleSubmit } = methods

    const onSubmit = async (data: FormData) => {
        setServerError(null)
        setLoading(true)

        try {
        const loginResponse = await authApi.login(data.username, data.password)
        router.push("/")
        router.refresh()
        } catch (error) {
        if (error instanceof AccessDeniedError) {
            setServerError("Las credenciales ingresadas son inválidas.")
        } else {
            setServerError("Ha ocurrido un error. Intente nuevamente más tarde.")
        }
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-24">
            <div className="bg-white rounded-xl shadow-md w-full max-w-md px-8 py-10">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h1>

                <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputText
                    label="Nombre de usuario"
                    fieldName="username"
                    placeholder="Nombre de usuario"
                    type="text"
                    />

                    <InputText
                    label="Contraseña"
                    fieldName="password"
                    placeholder="Contraseña"
                    type="password"
                    />

                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-2 rounded-lg transition-all shadow
                        ${loading
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500"}
                    `}
                    >
                    {loading && (
                        <span className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
                    )}
                    Ingresar
                    </button>

                    {serverError && (
                    <div className="text-red-600 text-sm text-center mt-2">{serverError}</div>
                    )}
                </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default LoginForm
