import { useEffect, useState } from "react"
import CrearElemento from "../comunes/CrearElemento"

export default function CrearProyecto({ onCrearProyecto }) {
    const [ultimoCliente, setUltimoCliente] = useState(null);

    //En caso de querer crear un proyecto desde la pagina de proyectos desde 0 cojo el último cliente creado de la 
    //lista de clientes y lo creo asociandolo a este cliente
    useEffect(() => {
        const fetchUltimoCliente = async () => {
            try {
                const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI",
                    },
                });
                const clientes = await res.json();
                console.log("CrearProyecto: clientes: ", clientes);
                if (clientes.length > 0) {
                    setUltimoCliente(clientes[clientes.length - 1]);
                }
            } catch(error) {
                console.error("CrearProyecto: Error al obtener último cliente: ", error);
            }
        };
        fetchUltimoCliente();
    }, []);

    const handleCrearProyecto = () => {
        if(ultimoCliente) {
            console.log("IF CrearProyecto: ultimoCliente: ", ultimoCliente);
            onCrearProyecto(ultimoCliente);
        } else{
            alert("Crea un cliente primero");
        }
    }
    return(
        <CrearElemento
            onCrear={handleCrearProyecto}
            titulo="Crea tu primer proyecto"
            subtitulo="Para poder asociarlo a un cliente"
            textoBoton="Crear Proyecto"
        />
    )
}