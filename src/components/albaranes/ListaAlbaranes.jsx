//Componente que devuelve la lista con todos los albaranes

export default function ListaAlbaranes({ albaranes, onEliminarAlbaran, onCrearAlbaran }) {
    console.log("ListaAlbaranes: Albaranes: ", albaranes);
    //mirar estado del albaran
    const obtenerEstado = (pending, deleted) => {
        if(pending) return "Pendiente";
        if(deleted) return "Finalizado";
        return "En marcha";
    }
    
    return(
        <div className="padre flex flex-col h-full bg-gray-900 text-gray-200 rounded-lg shadow-lg border-4 border-fuchsia-700">
            <div className="flex justify-between items-center p-4 bg-black border-b border-red-500">
                <h2 className="text-xl font-bold text-red-500">Lista de Albaranes</h2>
                <button
                    onClick={onCrearAlbaran} // Llama a la función pasada como prop
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    Crear Nuevo Albarán
                </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                {albaranes.length === 0 ? (
                    <div className="p-4 text-center text-gray-300">
                        <p className="text-lg font-semibold">Todavía no hay albaranes asociados a este proyecto.</p>
                    </div>
                ) : (
                    <table className="min-w-full border border-gray-700 bg-black text-gray-200">
                        <thead>
                            <tr className="cabecera bg-gray-200">
                                <th className="border border-gray-300 bg-black px-4 py-2 text-left">Núm.</th>
                                <th className="border border-gray-300 bg-black px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-300 bg-black px-4 py-2 text-left">Código</th>
                                <th className="border border-gray-300 bg-black px-4 py-2 text-left">Fecha</th>
                                <th className="border border-gray-300 bg-black px-4 py-2 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {albaranes.map((albaran, index) => (
                                <tr key={albaran._id}>
                                    <td className="border border-gray-300 py-2 text-center">{index+1}</td>
                                    <td className="border border-gray-300 py-2 text-center">{albaran.description}</td>
                                    <td className="border border-gray-300 py-2 text-center">#{albaran._id}</td>
                                    <td className="border border-gray-300 py-2 text-center">{new Date(albaran.createdAt).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span className={`px-2 py-1 rounded-md text-white ${
                                            obtenerEstado(albaran.pending, albaran.deleted) === "Finalizado"
                                                ? "bg-green-500"
                                                : obtenerEstado(albaran.pending, albaran.deleted) === "Pendiente"
                                                ? "bg-yellow-500"
                                                : "bg-blue-500"
                                            }`}
                                        >
                                            {obtenerEstado(albaran.pending, albaran.deleted)}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onEliminarAlbaran(albaran._id);
                                            }}
                                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}