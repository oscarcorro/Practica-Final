"use client";

import { useState } from "react";

export default function NotasCliente() {
    const [nota, setNota] = useState("");

    return (
        <div className="notas-cliente p-4 border border-gray-300 rounded-md shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Notas</h2>
            <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Añade una nota sobre tu cliente..."
                className="textarea w-full p-2 border border-gray-300 rounded-md resize-none"
                rows="4"
            />
        </div>
    );
}
