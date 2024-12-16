import * as Yup from "yup";
import FormularioBase from "../comunes/FormularioBase";
import ConfirmacionProyecto from "./ConfirmacionProyecto";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ForumlarioProyecto({ cerrarFormulario, actualizarListaProyectos, cliente}) {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const router = useRouter();
    
    console.log("FormularioProyecto: Cliente recibido: ", cliente);
    console.log("FormularioProyecto: Id cliente recibido: ", cliente._id)

    const SignSquema = Yup.object({
        nombre: Yup.string().required("*El nombre es obligatorio"),
        codigo: Yup.string().required("*El código es obligatorio"),
        direccion: Yup.string().required("*La dirección es obligatoria"),
        email: Yup.string().email("*El email no es válido").required("*El email es obligatorio"),
        codigoInterno: Yup.string().required("*El código interno es obligatorio"),
    });

    const initialValues = {
        nombre: "",
        codigo: "",
        direccion: cliente?.address?.street + ", " + cliente?.address?.number + ", " + cliente?.address?.postal + ", " + cliente?.address?.city + ", " + cliente?.address?.province || "", //si el cliente tiene domicilio se autocompleta
        email: "",
        codigoInterno: "",
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("FormularioProyecto: Datos enviados:", values);

        const data = {
            name: values.nombre,
            projectCode: values.codigo,
            email: values.email,
            address: {
                street: values.direccion,
                number: cliente?.address?.number || 0,
                postal: cliente?.address?.postal || 0,
                city: cliente?.address?.city || "",
                province: cliente?.address?.province || "",
            },
            code: values.codigoInterno,
            clientId: cliente._id, //id del cliente al que asociamos el proyecto obtenido param
        };

        try {
            const res = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                },
                body: JSON.stringify(data),
            });

            const nuevoProyecto = await res.json();

            if (res.ok) {
                resetForm(); //vaciar el formulario
                setMostrarConfirmacion(true); //ventana emergente de confirmacion
                actualizarListaProyectos(nuevoProyecto);
                localStorage.removeItem("clienteCreado");//quitar el cliente de localStorage si ya se ha creado el proyecto
            } else {
                console.error("Error al crear el proyecto:", nuevoProyecto);
                alert("Error al crear el proyecto.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red, inténtalo de nuevo más tarde.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCerrarConfirmacion = () => {
        setMostrarConfirmacion(false);
        cerrarFormulario();
        router.push("/projects");
    }

    const fields = [
        { name: "nombre", label: "Nombre del Proyecto*", type: "text", placeholder: "Ingrese el nombre del proyecto" },
        { name: "codigo", label: "Código*", type: "text", placeholder: "Ingrese el código del proyecto" },
        { name: "direccion", label: "Dirección de Proyecto*", type: "text", placeholder: "Ingrese la dirección" },
        { name: "email", label: "Email*", type: "email", placeholder: "Ingrese el email" },
        { name: "codigoInterno", label: "Código Interno del Proyecto", type: "text", placeholder: "Ingrese el código interno" },
    ];

    return (
        <div className="padre flex flex-1 flex-col items-center justify-center bg-black">
            {mostrarConfirmacion ? (
                <ConfirmacionProyecto onClose={handleCerrarConfirmacion}/>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <div className="w-2/3 p-6 border-3 border-yellow-300">
                        <FormularioBase
                            initialValues={initialValues}
                            validationSchema={SignSquema}
                            onSubmit={handleSubmit}
                            fields={fields}
                            title="Nuevo Proyecto"
                            onClose={cerrarFormulario}
                        />
                    </div>
                </div>
            )}
        </div>
    );

    /*return (
        <div className="padre flex flex-1 flex-col items-center justify-center bg-gray-100 border border-gray-600">
            {mostrarConfirmacion ? (
                <ConfirmacionEmergente onClose={handleCerrarConfirmacion}/>
            ) : (
                <div className="flex w-full">
                    <div className="w-2/3 p-6 border-3 border-yellow-300">
                        <FormularioBase
                            initialValues={initialValues}
                            validationSchema={SignSquema}
                            onSubmit={handleSubmit}
                            fields={fields}
                            title="Nuevo Proyecto"
                            onClose={cerrarFormulario}
                        />
                    </div>
                </div>
            )}
        </div>
    );*/
}