"use client";

import { useState, useEffect } from "react";
import ListaAlbaranesPage from "@/components/albaranes/ListaAlbaranesPage";

export default function AlbaranesPage() {
    const [albaranes, setAlbaranes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbaranes = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });

                const albaranesData = await res.json();
                console.log("AlbaranesPage: Albaranes recibidos:", albaranesData);
                //Por algun motivo en projectId me guardaba el proyecto entero como objeto por lo que a partir de ahi he decidido acceder al
                //_id del proyecto para poder obtener su nomrbe
                const albaranesConDetalles = await Promise.all(
                    albaranesData.map(async (albaran) => {
                        const [clienteRes, proyectoRes] = await Promise.all([
                            fetch(`https://bildy-rpmaya.koyeb.app/api/client/${albaran.clientId}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                                },
                            }),
                            fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${albaran.projectId._id}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                                },
                            }),
                        ]);
                        //Con ayuda de chatGPT he obtenido el cliente y el proyecto por separado
                        //guarda en clienteRes el primer fetch y en proyectoRes el segundo
                        const cliente = clienteRes.ok ? await clienteRes.json() : null;
                        const proyecto = proyectoRes.ok ? await proyectoRes.json() : null;
                        //asigna el nombre del cliente y el del proyecto a estas variables
                        return {
                            ...albaran,
                            clienteNombre: cliente?.name || "Sin cliente",
                            proyectoNombre: proyecto?.name || "Sin proyecto",
                            fechaCreacion: new Date(albaran.createdAt).toLocaleDateString("es-ES"),
                        };
                    })
                );

                setAlbaranes(albaranesConDetalles);
            } catch (error) {
                console.error("Error al obtener los albaranes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbaranes();
    }, []);

    return (
        <div className="flex h-full overflow-hidden bg-black">
            {loading ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg border-4 border-red-600 text-center">
                        <p className="text-xl font-semibold">Cargando Albaranes...</p>
                    </div>
                </div>
            ) : albaranes.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg border-4 border-red-600 text-center">
                        <p className="text-xl font-semibold">No hay albaranes registrados</p>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full overflow-y-auto">
                    <ListaAlbaranesPage albaranes={albaranes} />
                </div>
            )}
        </div>
    );
}
