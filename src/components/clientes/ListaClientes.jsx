"use client";

import { useEffect, useState } from "react";
import ForumlarioCliente from "./FormularioCliente";

export default function ListaClientes({ clientes, onCrearCliente, onSeleccionarCliente, onEliminarCliente }) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    
    return (
        <div className="padre flex flex-col h-full p-4 bg-black text-gray-100">
            {mostrarFormulario ? (
                <FormularioCliente
                    cerrarFormulario={() => setMostrarFormulario(false)}
                    onSubmit={onCrearCliente}
                />
            ) : ( 
                <div className="flex-grow overflow-y-auto scrollbar-custom max-h-screen">
                    <ul className="space-y-4">
                        {clientes.map((cliente) => (
                            <li
                                key={cliente._id}
                                className="p-4 bg-gray-800 shadow-md rounded-lg hover:bg-gray-700 cursor-pointer transition"
                            >
                                <div onClick={() => onSeleccionarCliente(cliente._id)} className="cursor-pointer">
                                    <p className="text-gray-100 text-lg font-medium">{cliente.name}</p>
                                    <p className="text-gray-400 text-sm">CIF: {cliente.cif}</p>
                                </div>

                                <button
                                    onClick={(event) => {
                                        event.stopPropagation(); // evitar que intente mostrar también los detalles
                                        onEliminarCliente(cliente._id);
                                    }}
                                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="crearcliente p-2 bg-red-600 text-white mt-5 rounded-md hover:bg-red-700 transition"
                        onClick={onCrearCliente}
                    >
                        Crear otro cliente
                    </button>
                </div>
            )}
        </div>
    );
}
