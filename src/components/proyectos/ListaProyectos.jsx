//Componente que devuelve la lista con todos los proyectos registrados.
//He decidido no hacer un componente general y usar uno especifico en clientes y otro en proyectos porque los datos que hay 
//que mostrar en proyectos son muchos mas

export default function ListaProyectos({ proyectos, clientes, onCrearProyecto, onSeleccionarProyecto, onEliminarProyecto }) {
    console.log("ListaProyectos: Clientes: ", clientes);
    //Buscar el nombre del cliente con un find a traves de la lista de clientes, matcheando clientId en proyectos con _id en clientes
    const obtenerNombreCliente = (clientId) => {
        const cliente = clientes.find((cliente) => cliente._id === clientId);
        console.log("ListaProyectos: Cliente encontrado: ", cliente)
        return cliente.name;
    }

    const handleCrearProyecto = (clientId) => {
        console.log("ListaProyectos: clientId recibido: ", clientId);
        const cliente = clientes.find((cliente) => cliente._id === clientId);
        if (cliente) {
            console.log("ListaProyectos: Cliente encontrado: ", cliente);
            localStorage.setItem("clienteCreado", JSON.stringify(cliente));
            onCrearProyecto(cliente);
        } else {
            console.error("ListaProyectos: No se encontró un cliente con el ID:", clientId);
        }
    }
    
    return( 
        <div className="padre p-6 m-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg border-4 border-red-800">
            <div className="flex-grow overflow-y-auto">
                <h2 className="text-3xl font-bold mb-6 text-white">Lista de Todos los Proyectos</h2>
                <table className="min-w-full border border-gray-700 bg-gray-900 text-gray-200">
                    <thead>
                        <tr className="cabecera bg-red-800 text-white">
                            <th className="border border-gray-700 px-4 py-2 text-center">Código</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Fecha</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Nombre</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Cliente</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Código Interno</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Estado</th>
                            <th className="border border-gray-700 px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map((proyecto) =>
                            <tr key={proyecto.projectCode}>
                                <td className="border border-gray-700 px-4 py-2 text-center">#{proyecto.projectCode}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{new Date(proyecto.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{proyecto.name}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">
                                    <div className="flex items-center">
                                        {/*<img
                                            src={proyecto.cliente.imagen}
                                            alt={proyecto.cliente.nombre}
                                            className="w-6 h-6 rounded-full mr-2"
                                        />*/}
                                        <span>{obtenerNombreCliente(proyecto.clientId)}</span>
                                    </div>
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{proyecto.code}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${
                                        proyecto.deleted
                                            ? "bg-red-600"
                                            : proyecto.active
                                            ? "bg-green-600"
                                            : "bg-yellow-600"
                                        }`}
                                    >
                                        {proyecto.deleted
                                        ? "Eliminado"
                                        : proyecto.active
                                        ? "Activo"
                                        : "Inactivo"}
                                    </span>
                                </td>
                                <td className="border border-gray-700 px-4 py-2 flex space-x-2 justify-center">
                                    <button
                                        onClick={() => onSeleccionarProyecto(proyecto._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onEliminarProyecto(proyecto._id);
                                        }}
                                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                        onClick={() => handleCrearProyecto(proyecto.clientId)}
                                    >
                                        Crear Nuevo Proyecto
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}