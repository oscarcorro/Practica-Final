"use client";

import { useState } from "react";

export default function EtiquetasCliente() {
    const [etiquetas, setEtiquetas] = useState([]);
    const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");

    const handleAddEtiqueta = () => {
        if (nuevaEtiqueta.trim() !== "") {
            setEtiquetas([...etiquetas, nuevaEtiqueta.trim()]);
            setNuevaEtiqueta("");
        }
    };

    const handleRemoveEtiqueta = (index) => {
        setEtiquetas(etiquetas.filter((_, i) => i !== index));
    };

    return (
        <div className="etiquetas-cliente p-4 border border-gray-300 rounded-md shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Tags</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={nuevaEtiqueta}
                    onChange={(e) => setNuevaEtiqueta(e.target.value)}
                    placeholder="Añade una etiqueta..."
                    className="input w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleAddEtiqueta}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Añadir
                </button>
            </div>
            <div className="etiquetas flex flex-wrap gap-2">
                {etiquetas.map((etiqueta, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-500 px-3 py-1 rounded-md"
                    >
                        {etiqueta}
                        <button
                            onClick={() => handleRemoveEtiqueta(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
