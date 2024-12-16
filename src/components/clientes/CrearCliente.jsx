import CrearElemento from "../comunes/CrearElemento"

export default function CrearCliente({ onCrearCliente }) {
    return(
        <CrearElemento
            onCrear={onCrearCliente}
            titulo="Crea tu primer cliente"
            subtitulo="Para poder generar Albaranes Digitales"
            textoBoton="Crear Cliente"
        />
    )
}