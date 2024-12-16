export default function ListaAlbaranesPage({ albaranes }) {
    const handleDownloadPDF = async (albaranId) => {
        try {
            const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${albaranId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/pdf",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVjZjFiOWNkZTQ4ZTgwMzJmMWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI2MTc3NzcsImV4cCI6MTczNTIwOTc3N30.9urI--ukKLk4A2uhbIOyIDM1Jj6xYFywtzofYK9btfI", 
                },
            });
            //Como descargar un pdf con ayuda de documentacin
            const blob = await res.blob();
            //Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `albaran_${albaranId}.pdf`; // Nombre del archivo descargado
            link.click();
            //Liberar el objeto URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("ListaAlbaranesPage: Error al descargar el PDF:", error);
            alert("Hubo un problema al descargar el PDF");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg border-4 border-red-800">
            <h2 className="text-3xl font-bold mb-6 text-white">Lista de Todos los Albaranes</h2>
            <table className="w-full border-collapse border border-gray-700 bg-black">
                <thead>
                    <tr className="bg-red-800 text-white">
                        <th className="border border-gray-700 px-4 py-3 text-center">Cliente</th>
                        <th className="border border-gray-700 px-4 py-3 text-center">Proyecto</th>
                        <th className="border border-gray-700 px-4 py-3 text-center">Descripción</th>
                        <th className="border border-gray-700 px-4 py-3 text-center">Fecha de Creación</th>
                        <th className="border border-gray-700 px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {albaranes.map((albaran) => (
                        <tr key={albaran._id}>
                            <td className="border border-gray-700 px-4 py-2 text-center">{albaran.clienteNombre}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{albaran.proyectoNombre}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{albaran.description}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">{new Date(albaran.createdAt).toLocaleDateString()}</td>
                            <td className="border border-gray-700 px-4 py-2 text-center">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform"
                                    onClick={() => handleDownloadPDF(albaran._id)}
                                >
                                    Descargar PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
