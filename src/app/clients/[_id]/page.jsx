"use client";

import DetallesCliente from "@/components/clientes/DetallesCliente";
import ListaClientes from "@/components/clientes/ListaClientes";
import ForumlarioCliente from "@/components/clientes/FormularioCliente";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientDetailsPage({ params }) {
    const { _id } = params;
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [clienteCreado, setClienteCreado] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchClientes = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setClientes(data);
            } catch (error) {
                console.error("Error al obtener los clientes:", error);
                setClientes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    const actualizarListaClientes = (nuevoCliente) => {
        setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
    };

    const handleSeleccionarCliente = (_id) => {
        router.push(`/clients/${_id}`);
    }
    
    const handleCrearCliente = async (values, { setSubmitting, resetForm }) => {
        console.log("Formulario Cliente: Datos enviados:", values);

        //Con ayuda de GPT: es destructuración, sirve para extraer variables de un string y asignarlo a variables individuales
        const [street, number, postal, city, province] = values.domicilio.split(",").map(part => part.trim());

        const data = {
            name: values.nombre,
            cif: values.cif,
            address: {
                street: street,
                number: parseInt(number, 10) ||0,
                postal: parseInt(postal, 10) ||0,
                city: city || "",
                province: province ||"",
            },
        };

        try {
            const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                },
                body: JSON.stringify(data),
            });

            const nuevoCliente = await res.json();

            if (res.ok) {
                console.log("Formulario Cliente: Nuevo cliente: ", nuevoCliente);
                resetForm();
                setClienteCreado(nuevoCliente);
                setMostrarConfirmacion(true);
                console.log("actualizarListaClientes prop:", actualizarListaClientes);
                localStorage.setItem("clienteCreado", JSON.stringify(nuevoCliente)); //guardar cliente para poder asignar proyectos accediendo a su id
            } else {
                const errorData = await res.json();
                console.error("Error al crear el cliente:", errorData);
                alert("Error al crear el cliente: ${errorData.errors?.[0]?.msg" || "Verifica los datos");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red, inténtalo de nuevo más tarde.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEliminarCliente = async (id) => {
        try {
            const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI'
                },    
            });
            if (res.ok) {
                setClientes((prevClientes) => prevClientes.filter((cliente) => cliente._id !== id));
                alert("Cliente eliminado correctamente");
                if (id === _id) {
                    router.push("/clients");
                }
            } else {
                alert("Error al eliminar el cliente");
            }
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("Error de red");
        }
    };

    return (
        <div className="flex h-full overflow-y-auto">
            {mostrarFormulario ? 
                (<ForumlarioCliente cerrarFormulario={() => setMostrarFormulario(false)} actualizarListaClientes={actualizarListaClientes} onSubmit={handleCrearCliente}/>
                ) : (
                    <>
                        <div className="w-1/3 h-full overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg border-4 border-red-600 text-center">
                                        <p className="text-xl font-semibold">Cargando Clientes...</p>
                                    </div>
                                </div>
                            ) : (
                                <ListaClientes
                                    clientes={clientes}
                                    onCrearCliente={() => setMostrarFormulario(true)}
                                    onSeleccionarCliente={handleSeleccionarCliente}
                                    onEliminarCliente={handleEliminarCliente}
                                />
                            )}
                        </div>
                        <div className="w-2/3 p-6 bg-gray-900 ">
                            <DetallesCliente _id={_id} />
                        </div>
                    </>
                )
            }  
        </div>       
    );
}
