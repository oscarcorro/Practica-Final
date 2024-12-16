"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [userEmail, setUserEmail] = useState("");
    const pathname = usePathname();

    //nombres de la pagina a mostrar a la izq del header
    const nombresPaginas = {
        "/clients": { title: "Clientes", subtitle: "Todos tus clientes" },
        "/projects": { title: "Proyectos", subtitle: "Todos tus proyectos" },
        "/albaranes": { title: "Albaranes", subtitle: "Todos tus albaranes" },
        "/onBoarding": { title: "OnBoarding", subtitle: "" },
        "/": { title: "Inicio", subtitle: "Bienvenido a la página principal" },
    }

    const paginaActual = nombresPaginas[pathname] || { title: "", subtitle: "" };

    useEffect(() => {
        const fetchUserEmail = async () => {
          try {
            const token = localStorage.getItem("jwt");
            console.log("Header: jwt: ", token);
            const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user", {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
    
            if (res.ok) {
              const data = await res.json();
              setUserEmail(data.email);
            } else {
              console.error("Header: Error al obtener el correo del usuario");
            }
          } catch (error) {
            console.error("Header: Error en la petición: ", error);
          }
        };
    
        fetchUserEmail();
      }, []);

    return(
        <header className="bg-black text-white px-6 py-4 shadow-md flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-white">{paginaActual.title}</h1>
                <p className="text-gray-400 text-sm">{paginaActual.subtitle}</p>
            </div>
            <div className="user-info text-gray-300">
                <strong>Usuario:</strong> {userEmail || "Cargando..."}
            </div>
        </header>
    );
}