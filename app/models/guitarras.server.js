export async function obtenerGuitarras() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
    return await respuesta.json()
}

export async function obtenerGuitarra(url) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}