"use client";

import DetallesProyecto from "@/components/proyectos/DetallesProyecto";
import ListaProyectos from "@/components/proyectos/ListaProyectos";
import ForumlarioProyecto from "@/components/proyectos/FormularioProyecto";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectDetailsPage({ params }) {
    const { _id } = params; // Obtener el ID del proyecto
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProyectos = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setProyectos(data);
            } catch (error) {
                console.error("ProjectDetailPage: Error al obtener los proyectos:", error);
                setProyectos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProyectos();
    }, []);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const data = await res.json();
                setClientes(data);
            } catch (error) {
                console.error("ProjectDetailsPage: Error al obtener los clientes:", error);
            }
        };
        fetchClientes();
    }, []);

    const actualizarListaProyectos = (nuevoProyecto) => {
        setProyectos((prevProyectos) => [...prevProyectos, nuevoProyecto]);
    };

    const handleSeleccionarProyecto = (_id) => {
        router.push(`/projects/${_id}`);
    }

    const handleEliminarProyecto = async (_id) => {
        try {
            const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI'
                },    
            });
            if (res.ok) {
                setProyectos((prevProyectos) => prevProyectos.filter((proyecto) => proyecto._id !== _id));
                alert("Proyecto eliminado correctamente");
                if (_id === _id) {
                    router.push("/projects");
                }
            } else {
                alert("Error al eliminar el proyecto");
            }
        } catch (error) {
            console.error("ProjectDetailsPage: Error al eliminar el proyecto:", error);
            alert("Error de red");
        }
    };

    return (
        <div className="flex h-full overflow-hidden">
            {mostrarFormulario ? 
                (<ForumlarioProyecto cerrarFormulario={() => setMostrarFormulario(false)} actualizarListaProyectos={actualizarListaProyectos}/>
                ) : (
                    <>
                        <div className="w-full p-6 bg-black">
                            <DetallesProyecto _id={_id} />
                        </div>
                    </>
                )
            }  
        </div>       
    );
}
