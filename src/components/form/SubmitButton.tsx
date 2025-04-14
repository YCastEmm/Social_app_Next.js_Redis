import { FieldValues, useFormContext } from "react-hook-form"

// Defino las props del botón de envío, usando un tipo genérico T que representa los datos del form
type SubmitButtonProps<T extends FieldValues> = {
    styles?: string                 // clases opcionales para el wrapper del botón
    label: string                   // texto del botón
    onSubmit: (data: T) => void     // función que se ejecuta al enviar el form, con los datos ya validados
}

// El componente es genérico para poder reutilizarlo en cualquier form con cualquier tipo de datos
const SubmitButton = <T extends FieldValues>({ label, styles, onSubmit }: SubmitButtonProps<T>) => {

    // Accedo al handleSubmit del formulario usando el contexto
    // Esto requiere que el componente esté dentro de un <FormProvider>
    const { handleSubmit } = useFormContext<T>()

    return (
        <div className={`${styles ?? ""}`}>
            {/* handleSubmit valida con el resolver (ej: Yup) y luego ejecuta la función si está todo ok */}
            <button
                className="button-primary"
                onClick={handleSubmit(onSubmit)}>
                {label}
            </button>
        </div>
    )
}

export default SubmitButton
