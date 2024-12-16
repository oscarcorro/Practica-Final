"use client";

export default function LogoCliente() {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Archivo seleccionado:", file);
    };

    return (
        <div className="logo-cliente p-4 border border-gray-300 rounded-md shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Logo Cliente</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
    );
}
