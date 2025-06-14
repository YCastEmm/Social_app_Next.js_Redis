"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    query: string;
};

type SearchBarProps = {
    initialQuery: string | undefined;
};

const SearchBar = ({ initialQuery }: SearchBarProps) => {
    const router = useRouter();

    const { register, handleSubmit, setValue } = useForm<FormData>({
        defaultValues: {
            query: initialQuery,
        },
    });

    useEffect(() => {
        setValue("query", initialQuery ?? "");
    }, [initialQuery]);

    const onSubmit = (data: FormData) => {
        router.push(`/?query=${data.query ?? ""}&type=hash`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full mb-4">
            <input {...register("query")} placeholder="Buscar por #Fuerza, #Jedi" className="w-full rounded-l-lg border-2 border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
            <button type="submit" className="button-primary rounded-l-none rounded-r-lg">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;
