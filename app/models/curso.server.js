export async function obtenerCurso() {
    const respuesta = await fetch(`${process.env.API_URL}/curso?populate=imagen`)
    return await respuesta.json()
}