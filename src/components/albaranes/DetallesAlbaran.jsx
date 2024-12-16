"use client";

import { useState, useEffect } from "react";
import ListaAlbaranes from "../albaranes/ListaAlbaranes";
import FormularioDeliveryNote from "../albaranes/FormularioDeliveryNote";

export default function DetallesProyecto({ _id }) {
    const [proyecto, setProyecto] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [albaranes, setAlbaranes] = useState([]);
    const [isLoadingProyecto, setIsLoadingProyecto] = useState(true);
    const [isLoadingCliente, setIsLoadingCliente] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Fetch del proyecto y cliente
    useEffect(() => {
        const fetchProyecto = async () => {
            setIsLoadingProyecto(true);
            try {
                const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setProyecto(data);

                // Fetch del cliente después de obtener el proyecto
                if (data.clientId) {
                    fetchCliente(data.clientId);
                }
            } catch (error) {
                console.error("Error al obtener el proyecto:", error);
            } finally {
                setIsLoadingProyecto(false);
            }
        };

        const fetchCliente = async (clientId) => {
            setIsLoadingCliente(true);
            try {
                const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setCliente(data);
            } catch (error) {
                console.error("Error al obtener el cliente:", error);
            } finally {
                setIsLoadingCliente(false);
            }
        };

        const fetchAlbaranes = async () => {
            try {
                const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                const filteredAlbaranes = data.filter((albaran) => albaran.projectId === _id);
                setAlbaranes(filteredAlbaranes);
            } catch (error) {
                console.error("Error al obtener los albaranes:", error);
            }
        };

        fetchProyecto();
        fetchAlbaranes();
    }, [_id]);

    const handleCrearAlbaran = () => {
        setMostrarFormulario(true);
    };

    const handleCerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const actualizarListaAlbaranes = (nuevoAlbaran) => {
        setAlbaranes((prev) => [...prev, nuevoAlbaran]);
    };

    if (isLoadingProyecto) {
        return <p className="text-gray-500">Cargando detalles del proyecto...</p>;
    }

    return (
        <div className="p-6 bg-black text-gray-100">
            {/* Contenedor principal */}
            <div className="grid grid-cols-3 gap-6">
                {/* Detalles del proyecto */}
                <div className="col-span-2 bg-gray-800 shadow-md p-6 rounded-md border border-red-500">
                    <h1 className="text-3xl font-bold mb-4 text-red-500">{proyecto?.name}</h1>
                    <p className="text-gray-300 text-lg font-semibold mb-2">Datos de este proyecto</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold text-gray-400">Ubicación</p>
                            <p>{`${proyecto?.address.street}, ${proyecto?.address.number}, ${proyecto?.address.city}, ${proyecto?.address.postal}`}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-400">Código Interno</p>
                            <p>{proyecto?.projectCode}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => alert("Funcionalidad de editar en desarrollo")}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Editar Proyecto
                    </button>
                </div>

                {/* Cliente asociado */}
                <div className="bg-gray-800 shadow-md p-6 rounded-md border border-red-500">
                    {isLoadingCliente ? (
                        <p>Cargando datos del cliente...</p>
                    ) : cliente ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-red-500">Cliente Asociado</h2>
                            <div className="bg-gray-900 p-4 rounded-md">
                                <p className="mb-2">
                                    <strong>Nombre:</strong> {cliente.name}
                                </p>
                                <p className="mb-2">
                                    <strong>Domicilio Fiscal:</strong> {cliente.address?.street}, {cliente.address?.number},{" "}
                                    {cliente.address?.postal}, {cliente.address?.city}
                                </p>
                                <p className="mb-2">
                                    <strong>CIF:</strong> {cliente.cif}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>No se encontró información del cliente.</p>
                    )}
                </div>
            </div>

            {/* Contenedor de lista de albaranes */}
            <div className="mt-6 bg-gray-800 shadow-md p-6 rounded-md border border-red-500">
                <h2 className="text-xl font-semibold mb-4 text-red-500">Albaranes</h2>
                <ListaAlbaranes
                    albaranes={albaranes}
                    onCrearAlbaran={handleCrearAlbaran}
                />
            </div>

            {mostrarFormulario && (
                <div className="mt-6">
                    <FormularioDeliveryNote
                        clienteId={cliente?._id}
                        projectId={_id}
                        cerrarFormulario={handleCerrarFormulario}
                        actualizarListaAlbaranes={actualizarListaAlbaranes}
                    />
                </div>
            )}
        </div>
    );
}