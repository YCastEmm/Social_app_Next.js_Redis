"use client"

import { useFormContext } from "react-hook-form"

// Props que definen los datos necesarios para renderizar el input
type InputTextProps = {
    styles?: string                // clases opcionales para el contenedor
    label: string                  // texto que aparece arriba del input
    placeholder?: string           // texto guía dentro del input
    fieldName: string              // nombre del campo (clave del objeto del form)
    type: "text" | "password"      // tipo de input (por ahora solo estos dos)
}

const InputText = ({styles, label, placeholder, fieldName, type} : InputTextProps) => {
    
    // Uso useFormContext para conectarme al formulario "padre" (tiene que estar envuelto con FormProvider)
    // - register: para vincular el input al form
    // - errors: para saber si hubo errores de validación
    const {register, formState: {errors}} = useFormContext()

    return (
        <div className={`flex flex-col ${styles ?? ""}`}>
            <label className="mb-1">{label}</label>

            {/* Registro el input al campo que me pasaron por props */}
            <input
                {...register(fieldName)}
                type={type}
                placeholder={placeholder}
                className="p-1 pl-2 w-full mb-4 rounded bg-gray-50 border-2 border-gray-200 focus:border-blue-300 focus:outline-none"
            />

            {/* Muestro mensaje de error si el campo tiene errores (valido dinámicamente por el nombre del campo) */}
            {errors && errors[fieldName] && (
                <div className="text-red-600">Este campo es obligatorio.</div>
            )}
        </div>
    );
};

export default InputText;
