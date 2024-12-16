import { useRouter } from "next/navigation";

export default function ConfirmacionEmergente({ onClose }) {
    const router = useRouter();

    const handleReloadAndClose = () => {
        localStorage.removeItem("clienteCreado");
        onClose(); //cerrar confirmacio
        window.location.reload();
    };

    //Llevar a los proyectos del cliente
    const handleCreateProject = () => {
        const clienteGuardado = localStorage.getItem("clienteCreado");
        if (clienteGuardado) {
            console.log("Cliente guardado en localStorage para asociar proyecto:", JSON.parse(clienteGuardado));
            router.push(`/projects/`); // Redirige al formulario de proyectos
        } else {
            console.error("No se encontró un cliente en localStorage");
        }
    }


    return(
        <div className="padre flex flex-col w-1/4 h-1/4 justify-center items-center bg-gray-900 border-2 border-red-600 rounded-md shadow-md p-4">
            <p className="font-bold text-center text-lg text-white mb-2">
                Cliente creado y guardado con éxito!
            </p>
            <p className="text-sm text-red-600 mb-4">
                ¿Quieres asociar un proyecto a este cliente?
            </p>
            <div className="flex justify-end space-x-2">
                <button
                    className="border border-gray-400 bg-white text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition"
                    onClick={handleReloadAndClose}
                >
                    Cerrar
                </button>
                <button
                    className="border border-red-500 bg-white font-bold text-red-500 hover:bg-red-400 hover:text-white px-4 py-2 rounded-md transition"
                    onClick={handleCreateProject}
                >
                    Sí, vamos!
                </button>
            </div>
        </div>
    )
}