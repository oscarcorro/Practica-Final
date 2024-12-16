//Componente base para crear un elemento, ya sea cliente, proyecto o alabaran

export default function CrearElemento({ onCrear, titulo, subtitulo, textoBoton }) {
    return (
        <div className="padre flex flex-col items-center justify-center w-full h-full bg-black p-6">
            <div className="texto-principal text-center">
                <p className="text-2xl text-white font-bold">{titulo}</p>
                <p className="text-gray-500">{subtitulo}</p>
                <button
                    className="crear-elemento p-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
                    onClick={onCrear}
                >
                    {textoBoton}
                </button>
            </div>
        </div>
    );
}
