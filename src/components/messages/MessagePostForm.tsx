"use client"

import { httpPost } from "@/services/common/http.service";
import messageAPI from "@/services/messages/messages.service";
import Image from "next/image";
import { useEffect } from "react";
// Importo el hook principal de React Hook Form
import { useForm } from "react-hook-form";

// Defino el tipo de datos que espero en el formulario
type FormData = {
    message: string
}

const MessagePostForm = ({}) => {

    // Inicializo el hook de formulario
    // register: para vincular los inputs
    // handleSubmit: para manejar el submit
    // resetField: para limpiar campos puntuales
    // setFocus: para enfocar un campo específico
    const {register, handleSubmit, resetField, setFocus} = useForm<FormData>()

    // Apenas se monta el componente, enfoco el textarea
    useEffect(()=>{
        setFocus("message")        
    },[])

    // Función que se ejecuta al hacer submit del form
    const onSubmit = async (data: FormData) =>{
        const reponse = await messageAPI.postMessage(data.message)
        console.log(reponse);
        resetField("message") // limpio el campo después de enviar
        setFocus("message")   // vuelvo a enfocar el textarea
    }

    return (
        <div className="mb-4 grid grid-cols-12">
            <div className="w-full h-full mt-1 text-center mb-4 relative col-span-2 flex items-center">
                <Image
                    priority
                    className="rounded-full"
                    src={"https://i.pinimg.com/564x/1b/2d/c0/1b2dc0ce77080e4a682fbbfd2eb3b0c1.jpg"}
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
                        className="p-3 w-full mb-4 rounded bg-gray-50 border-2 border-gray-100 resize-none"
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
