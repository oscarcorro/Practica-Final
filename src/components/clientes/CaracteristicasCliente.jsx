"use client";

import LogoCliente from "./caracterisitcasClientes/LogoCliente";
import NotasCliente from "./caracterisitcasClientes/NotasCliente";
import EtiquetasCliente from "./caracterisitcasClientes/EtiquetasCliente";

export default function CaracteristicasCliente() {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md bg-white">
            <LogoCliente />
            <NotasCliente />
            <EtiquetasCliente />
        </div>
    );
}
