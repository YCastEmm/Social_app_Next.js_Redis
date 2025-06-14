"use client"

import useMessages from "@/contexts/message.context";
import { UserType } from "@/types/user.types";
import Image from "next/image";
import { useEffect } from "react";
// Importo el hook principal de React Hook Form
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"


type MessagePostFormType = {
    parentId?: string
    currentUser?: UserType
}


// Defino el tipo de datos que espero en el formulario
type FormData = {
    message: string,
}

const MessagePostForm = ({parentId, currentUser} : MessagePostFormType) => {

    const router = useRouter()

    const {postMessage} = useMessages()

    // Inicializo el hook de formulario
    // register: para vincular los inputs
    // handleSubmit: para manejar el submit
    // resetField: para limpiar campos puntuales
    // setFocus: para enfocar un campo específico
    const {register, handleSubmit, resetField, setFocus} = useForm<FormData>()

    // Apenas se monta el componente, enfoco el textarea
    useEffect(()=>{
        setFocus("message")        
    },[setFocus])

    // Función que se ejecuta al hacer submit del form
    const onSubmit = async (data: FormData) =>{
        postMessage(data.message, parentId)
        resetField("message") // limpio el campo después de enviar
        setFocus("message")   // vuelvo a enfocar el textarea
    }

    
    const goToLogin = () =>{
        router.push("/login")
            router.refresh()
    }

    if (!currentUser) {
    return (
        <div className="mb-6 w-full bg-indigo-50 border border-indigo-400 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#462bb1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-in-icon lucide-log-in">
                    <path d="m10 17 5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                </svg>

                <h3 className="text-indigo-800 text-lg font-semibold">Iniciá sesión para escribir un mensaje</h3>
            </div>
            <button className="button-primary px-6 py-2 text-sm font-semibold" type="button" onClick={goToLogin}>
                Iniciar sesión
            </button>
        </div>
    );
}


    return (
        <div className="mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-2 flex items-start justify-center pt-1">
                <Image
                priority
                className="rounded-full object-cover"
                src={currentUser.photoUrl}
                width={60}
                height={60}
                alt=""
                />
            </div>

            <div className="col-span-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    rows={4}
                    placeholder="¿Qué estás pensando?"
                    className="p-3 w-full mb-4 rounded-lg bg-gray-50 border border-gray-300 resize-none focus:border-indigo-400 focus:outline-none"
                    {...register("message", { required: true })}
                />

                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="button-primary uppercase font-semibold px-6 py-2 rounded-lg"
                    >
                    Publicar
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default MessagePostForm;
