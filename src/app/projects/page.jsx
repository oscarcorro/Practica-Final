"use client";

import { useState, useEffect } from "react"
import ForumlarioProyecto from "@/components/proyectos/FormularioProyecto";
import { useRouter } from "next/navigation";
import CrearProyecto from "@/components/proyectos/CrearProyecto";
import ListaProyectos from "@/components/proyectos/ListaProyectos";

export default function ProjectsPage() {
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cliente, setCliente] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const clienteGuardado = localStorage.getItem("clienteCreado");
        if(clienteGuardado) {
            const clienteGuardadoObjeto = JSON.parse(clienteGuardado);
            setCliente(clienteGuardadoObjeto);
            setMostrarFormulario(true);
            //console.log("ProjectsPage: useEffect: Cliente obtenido: ", clienteGuardadoObjeto._id);
        }
    }, []);

    //Obtener proyectos
    useEffect(() => {
        const fetchProyectos = async() => {
            setLoading(true);
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI'
                    },
                });
                
                const data = await res.json();
                console.log("ProjectsPage: Proyectos recibidos:", data);
                setProyectos(data);
            }catch(error){
                console.log("Error al obtener los proyectos: ", error);
                return <p>Error al obtener los proyectos</p>;
            }finally{
                setLoading(false);
            }
        };
        fetchProyectos();
    }, []);

    //obtener Clientes
    useEffect(() => {
        const fetchClientes = async() => {
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI'
                    },
                });
                
                const data = await res.json();
                console.log("ProjectsPage: Clientes cargados:", data);
                setClientes(data);
            }catch(error){
                console.log("Error al obtener los clientes: ", error);
            }finally{
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    const handleCrearProyecto = (cliente) => {
        console.log("ProjectsPage: Cliente recibido para crear proyecto:", cliente);
        setCliente(cliente); 
        setMostrarFormulario(true); 
    };

    const actualizarListaProyectos = (nuevoProyecto) => {
        setProyectos((prevProyectos) => [...prevProyectos, nuevoProyecto]);
    };

    const handleSeleccionarProyecto = (_id) => {
        router.push(`/projects/${_id}`);
    }

    const handleEliminarProyecto = async (_id) => {
        //Ventan de confirmación antes de eliminar un proyecto con ayudo de GPT

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
                router.push(`/projects/`);
            } else {
                alert("Error al eliminar el proyecto");
            }
        } catch (error) {
            console.error("ProjectsPage: Error al eliminar el proyecto:", error);
            alert("Error de red");
        }
    }
    const handleCerrarFormulario = () => {
        setMostrarFormulario(false);
        localStorage.removeItem("clienteCreado");
        setCliente(null);
    }

    /*const handleEliminarCliente = async (id) => {
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
                window.location.reload();
            } else {
                alert("Error al eliminar el cliente");
            }
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("Error de red");
        }
    };*/

    return(
        <div className="flex h-full overflow-hidden bg-black">
            {loading  ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg text-center border-4 border-red-600">
                        <p className="text-xl font-semibold">Cargando Proyectos...</p>
                    </div>
                </div>
            ) : mostrarFormulario ? (
                <ForumlarioProyecto 
                    cerrarFormulario={handleCerrarFormulario} 
                    actualizarListaProyectos={actualizarListaProyectos}
                    cliente={cliente}
                />
            ) : proyectos.length===0 ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-900">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg border-4 border-red-600 text-center">
                        <p className="text-xl font-semibold">No hay proyectos registrados</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-full h-full overflow-y-auto">
                        {!loading && clientes.length > 0 ? (
                            <ListaProyectos
                                proyectos={proyectos}
                                clientes={clientes}
                                onCrearProyecto={handleCrearProyecto}
                                onSeleccionarProyecto={handleSeleccionarProyecto}
                                onEliminarProyecto={handleEliminarProyecto}
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-900">
                                <div className="bg-gray-800 text-gray-100 p-6 rounded-lg text-center border-4 border-red-600">
                                    <p className="text-xl font-semibold">Cargando Clientes...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </> 
            )}           
        </div>
    );
}