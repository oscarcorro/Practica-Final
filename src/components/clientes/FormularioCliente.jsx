import { useState } from "react";
import * as Yup from "yup";
import ConfirmacionEmergente from "./ConfirmacionEmergente"; 
import CaracteristicasCliente from "./CaracteristicasCliente";
import FormularioBase from "../comunes/FormularioBase";


export default function ForumlarioCliente({ cerrarFormulario, actualizarListaClientes, initialValues=null, onSubmit }) {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [clienteCreado, setClienteCreado] = useState(null);

    const SignSquema = Yup.object({
        nombre: Yup.string().required("*El nombre es obligatorio"),
        domicilio: Yup.string()
            .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+,\s*\d+,\s*\d{5},\s*[A-Za-zÀ-ÖØ-öø-ÿ\s]+,\s*[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                "*El domicilio debe seguir el formato: Calle, Número, Código Postal, Ciudad, Provincia"
            )
        .required("*El domicilio es obligatorio"),
        cif: Yup.string()
            .matches(
                /^[A-Z]\d{7,8}$/,
                "*El CIF debe comenzar con una letra mayúscula seguida de 7 u 8 dígitos"
            )
            .optional(),
    });

    const defaultValues = {
        nombre: "",
        domicilio: "",
        cif: "",
    };

    const handleCerrarConfirmacion = () => {
        setMostrarConfirmacion(false);
        cerrarFormulario();
    }

    const fields = [
        { name: "nombre", label: "Nombre del Cliente o Empresa*", type: "text", placeholder: "Ingrese el nombre"},
        { name: "domicilio", label: "Domicilio Fiscal", type: "text", placeholder: "Ingrese el domicilio"},
        { name: "cif", label: "Si te sabes el CIF, añadelo aquí", type: "text", placeholder: "Ingrese el CIF"}
    ]

    return (
        <div className="padre flex flex-1 flex-col items-center justify-center bg-black">
            {mostrarConfirmacion ? (
                <ConfirmacionEmergente onClose={handleCerrarConfirmacion} _id={clienteCreado?._id}/>
            ) : (
                <div className="flex w-full">
                    <div className="w-2/3 p-6">
                        <FormularioBase
                            initialValues={initialValues || defaultValues}
                            validationSchema={SignSquema}
                            onSubmit={onSubmit}
                            fields={fields}
                            title={initialValues ? "Editar Cliente" : "Nuevo Cliente"}
                            onClose={handleCerrarConfirmacion}
                        />
                    </div>
                    <div className="w-1/3 p-6">
                        <CaracteristicasCliente/>
                    </div>
                </div>
            )}
        </div>
    );
}
