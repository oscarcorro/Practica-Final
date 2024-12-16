export default function ConfirmacionProyecto({ onClose }) {
    return (
        <div className="flex w-2/3 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 rounded-lg shadow-lg w-1/3 p-6 relative border-4 border-red-500">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white"
                >
                    ✕
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mt-4 text-center text-white">¡Enhorabuena!</h2>
                    <p className="text-center text-gray-400 mt-4">
                        El proyecto se ha creado correctamente.
                    </p>
                </div>
            </div>
        </div>
    );
}
