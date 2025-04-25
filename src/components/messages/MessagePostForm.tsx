"use client"

import useMessages from "@/contexts/message.context";
import messageAPI from "@/services/messages/messages.service";
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
        return  <div className="mb-4 flex flex-col items-center">
                    <h3 className="">Iniciá sesión para escribir un mensaje</h3>
                    <button className="button-primary mt-4 w-fit" type="submit" onClick={() => goToLogin()}>
                            Iniciar sesión
                    </button>
                </div>  
    }

    return (
        <div className="mb-4 grid grid-cols-12">
            <div className="w-full h-full mt-1 text-center mb-4 relative col-span-2 flex items-center">
                <Image
                    priority
                    className="rounded-full"
                    src={currentUser.photoUrl}
                    width={60}
                    height={60}
                    alt={""} />
            </div>
            <div className="flex flex-col mt-2 ml-2 col-span-10">
                {/* El handleSubmit recibe la función que va a manejar los datos */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea 
                        rows={4} 
                        placeholder="¿Qué estás pensando?"
                        className="p-3 w-full mb-4 rounded bg-gray-50 border-2 border-gray-200 resize-none focus:border-blue-300 focus:outline-none"
                        // Uso el register para conectar el textarea al form
                        {...register("message", {
                            required: true, // valido que sea obligatorio
                        })}
                    />
                    <div className="flex justify-end">
                        <button className="button-primary uppercase font-semibold w-fit" type="submit">
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessagePostForm;
