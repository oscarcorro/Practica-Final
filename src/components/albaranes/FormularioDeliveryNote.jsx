import { useState } from "react";
import * as Yup from "yup";
import FormularioBase from "../comunes/FormularioBase";

export default function ForumlarioDeliveryNote({ clienteId, proyectoId, onCerrarFormulario, onActualizarListaAlbaranes, onSubmit}) {
    const [formato, setFormato] = useState("");//comprueba si es de "material" o "hours"

    console.log("FormulatioDeliveryNote: ClienteId y proyectoId: ", clienteId, proyectoId);
    const initialValues = {
        clientId: clienteId || "",
        projectId: proyectoId || "",
        format: "",
        material: "",
        hours: "",
        description: "",
        workdate: new Date().toISOString().split("T")[0],//fehca actul, con GPT
    };

    const validationSchema = Yup.object().shape({
        format: Yup.string()
            .oneOf(["material", "hours"], "Selecciona un formato válido.") 
            .required("Selecciona si es material u horas."),
        material: Yup.string().when("format", (format, schema) => {
            return format === "material"
                ? schema.required("El tipo de material es obligatorio.")
                : schema.notRequired();
        }),
        hours: Yup.number().when("format", (format, schema) => {
            // Condicional para 'hours'
            return format === "hours"
                ? schema
                      .required("Número de horas obligatorio.")
                      .min(1, "Debe ser al menos 1 hora.")
                : schema.notRequired();
        }),
        description: Yup.string().required("La descripción es obligatoria."),
        workdate: Yup.date().required("La fecha de trabajo es obligatoria."),
    });
    

    const fields = [
        {
            name: "format",
            label: "Formato (Material u Horas)",
            type: "select",
            placeholder: "Selecciona formato",
            options: [
                { value: "", label: "Seleccionar" },
                { value: "material", label: "Material" },
                { value: "hours", label: "Horas" },
            ],
            onChange: (event, formik) => { //cambiar el texto del campo con ayuda de GPT
                const value = event.target.value;
                setFormato(value); // Actualiza el estado local
                formik.setFieldValue("format", value); // Actualiza Formik
                formik.setFieldValue("material", ""); // Reinicia campos dependientes
                formik.setFieldValue("hours", ""); 
            },
        },
        ...(formato === "material" //si es material
            ? [{
                    name: "material",
                    label: "Tipo de Material",
                    type: "text",
                    placeholder: "Especifica el material",
                },
              ] : []),
        ...(formato === "hours" //si son horas
            ? [{
                    name: "hours",
                    label: "Número de Horas",
                    type: "number",
                    placeholder: "Indica el número de horas",
                },
              ]  : []),
        { name: "description", label: "Descripción", type: "text", placeholder: "Descripción..." },
        { name: "workdate", label: "Fecha", type: "date", placeholder: "Selecciona la fecha" },
    ];

    return (
        <div className="bg-black text-gray-100 border border-red-500 rounded-lg p-6 shadow-lg w-[80%]">
            <FormularioBase
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                fields={fields}
                title="Crear Albarán"
                onClose={onCerrarFormulario}
            />
        </div>
    );
}
