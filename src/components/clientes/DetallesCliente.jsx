"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ForumlarioCliente from "./FormularioCliente";

export default function DetallesCliente({ _id }) {
    console.log("Detalles Cliente: _id recibido:", _id);

    const [cliente, setCliente] = useState(null);
    const [proyectos, setProyectos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    //obtener cliente
    useEffect(() => {
        const fetchCliente = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setCliente(data);
            } catch (error) {
                console.error("Error al obtener los datos del cliente: ", error);
            } finally {
                setIsLoading(false);
            }
        };


        //obtener proyectos asociados al cliente
        const fetchProyectos = async () => {
            try {
                const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/project`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                },
                });
                const data = await res.json();
                const proyectosFiltrados = data.filter((proyecto) => proyecto.clientId === _id); //filtrar mediante el id del cliente
                setProyectos(proyectosFiltrados);
            } catch (error) {
                console.error("Error al obtener los proyectos del cliente: ", error);
            }
        };

        if (_id) {
            fetchCliente();
            fetchProyectos();
        }
    }, [_id]);

    const handleUpdateCliente = async (values, setSubmitting) => {
        try {
            const [street, number, postal, city, province] = values.domicilio.split(",").map((part) => part.trim());
            const updatedData = {
                name: values.nombre,
                cif: values.cif,
                address: {
                    street,
                    number: parseInt(number, 10),
                    postal: parseInt(postal, 10),
                    city,
                    province,
                },
            };

            const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                const clienteActualizado = await res.json();
                setCliente(clienteActualizado);
                setIsEditing(false);
                router.push(`/clients/`);
            } else {
                alert("Error al actualizar cliente.");
            }
        } catch (error) {
            console.error("Error al actualizar cliente: ", error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleCrearProyecto = () => {
        localStorage.setItem("clienteCreado", JSON.stringify(cliente));
        router.push("/projects/");
    };

    return (
        <div className="padre p-6 bg-gray-950 text-gray-100 rounded-2xl shadow-2xl border-4 border-red-800">
            {isLoading ? (
                <p className="text-gray-400 text-lg text-center">Cargando detalles del cliente...</p>
            ) : isEditing ? (
                <ForumlarioCliente
                    initialValues={{
                        nombre: cliente?.name || "",
                        domicilio: `${cliente?.address?.street}, ${cliente?.address?.number}, ${cliente?.address?.postal}, ${cliente?.address?.city}, ${cliente?.address?.province}`,
                        cif: cliente?.cif || "",
                    }}
                    cerrarFormulario={() => setIsEditing(false)}
                    onSubmit={handleUpdateCliente}
                />           
            ) : cliente ? (
                <>
                    {/*Nombre y boton exitar*/}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold text-white">{cliente.name}</h2>
                        <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition"
                        >
                            Editar Cliente
                        </button>
                    </div>
                    {/*datos cliente*/}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-red-500 font-semibold mb-1">Domicilio Fiscal</p>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <p className="text-gray-200">{`${cliente.address.street} ${cliente.address.number}`}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-red-500 font-semibold mb-1">Ciudad</p>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <p className="text-gray-200">{cliente.address.city}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-red-500 font-semibold mb-1">Código Postal</p>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <p className="text-gray-200">{cliente.address.postal}</p>
                            </div>
                        </div>
                        <div>   
                            <p className="text-sm text-red-500 font-semibold mb-1">CIF</p>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <p className="text-gray-200">{cliente.cif}</p>
                            </div>
                        </div>
                    </div>
                    {/*lista proyectos*/}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                        <p className="text-3xl font-semibold text-white">Proyectos</p>
                        <button
                            onClick={handleCrearProyecto}
                            className="px-6 py-2 mt-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 hover:shadow-lg transition-transform "
                        >
                            Crear Nuevo Proyecto
                        </button>
                        </div>
                        {proyectos.length > 0 ? (
                        <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-gray-800 text-gray-100">
                                <th className="px-4 py-3">Núm.</th>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Código</th>
                                <th className="px-4 py-3">Fecha</th>
                                <th className="px-4 py-3">Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {proyectos.map((proyecto, index) => (
                                <tr key={proyecto._id} className="odd:bg-gray-700 even:bg-gray-800" >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{proyecto.name}</td>
                                    <td className="px-4 py-3">#{proyecto.code}</td>
                                    <td className="px-4 py-3">
                                        {new Date(proyecto.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${
                                            proyecto.deleted
                                                ? "bg-red-600"
                                                : proyecto.active
                                                ? "bg-green-600"
                                                : "bg-yellow-600"
                                            }`}
                                        >
                                            {proyecto.deleted
                                            ? "Eliminado"
                                            : proyecto.active
                                            ? "Activo"
                                            : "Inactivo"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        ) : (
                            <p className="text-gray-400 text-center">Este cliente no tiene proyectos asociados.</p>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-gray-300 text-center">No hay cliente seleccionado.</p>
            )}
        </div>
    );
}
