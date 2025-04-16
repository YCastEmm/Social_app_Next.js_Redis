"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    query: string
}

type SearchBarProps ={
    initialQuery: string | undefined
}

const SearchBar = ({initialQuery} : SearchBarProps) => {

    const router = useRouter()

    const {register, handleSubmit, setValue} = useForm<FormData>({
        defaultValues: {
            query: initialQuery
        }
    })

    useEffect(()=>{
            setValue("query",initialQuery ?? "")
        },[initialQuery])

    const onSubmit = (data: FormData) =>{
        router.push(`/?query=${data.query ?? ""}&type=hash`)
    }

    return  <form onSubmit={handleSubmit(onSubmit)} className="flex w-full mb-3">
                    <input
                        {...register("query")}
                        placeholder={"Buscar por #Fuerza, #Jedi"}
                        className="p-1 pl-2 w-full rounded bg-gray-50 border-2 border-gray-200 focus:border-blue-300 focus:outline-none" />
                    <button className="ml-2 button-primary" >Buscar</button>
            </form>
}

export default SearchBar;


