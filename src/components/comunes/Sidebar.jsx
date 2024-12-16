"use client"
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    const [isClosed, setIsClosed] = useState(false); //variable para ver si esta abierto o no
    //abrir o cerrar
    const toggleSideBar = () => {
        setIsClosed(!isClosed);
    }   
  return (
    <div className={`sidebar relative h-screen ${isClosed ? "w-16" : "w-64"} bg-black border-r-2 border-gray-600 text-white flex flex-col transition-all duration-300 ease-in-out`}>
        <button
            onClick={toggleSideBar}
            className={`absolute top-5 ${isClosed ? "right-[-32px]" : "right-0"} w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-r-md hover:bg-red-500 transition-all duration-300 transform ${isClosed ? "rotate-0" : "rotate-180"}`}
        >
            {isClosed ? ">" : ">"}
        </button>
        <div className={`logo ${isClosed ? "text-xs" : "text-xl"} font-bold flex justify-center items-center mb-8 mt-5 ${isClosed ? "h-10" : "h-20"}`}>
            Logo
            {/*<Image
                src="/../images/logoSidebar.png"
                alt="Logo"
                width={isClosed ? 40 : 80}
                height={isClosed ? 40 : 80}
                className="transition-all duration-300"
            />*/}
        </div>
        {/*Lo tenia como lista pero para no repetir el estilo lo he pasado a nav*/}
        <nav className="menu flex-1 px-2 text-center">
            <ul className="space-y-4">
            {[
                { name: "Clientes", href: "/clients" },
                { name: "Proyectos", href: "/projects" },
                { name: "Albaranes", href: "/albaranes" },
            ].map((item, index) => (
                <li key={index}>
                <Link href={item.href}>
                    <span className={`block px-4 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300 ${isClosed ? "text-center" : "" }`}>
                    {isClosed ? item.name[0] : item.name}
                    </span>
                </Link>
                </li>
            ))}
            </ul>
        </nav>
    </div>
  );
};

