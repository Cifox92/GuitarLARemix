import { useLoaderData } from '@remix-run/react'
import { obtenerGuitarras } from '~/models/guitarras.server'
import ListadoGuitarras from '~/components/listado-guitarras'

export function meta() {
    return {
        title: 'GuitarLA - Tienda de Guitarras',
        description: 'GuitarLA - Nuestra colección de Guitarras'
    }
}

export async function loader() {
    const guitarras = await obtenerGuitarras()

    return guitarras.data
}

const Guitarras = () => {
    const guitarras = useLoaderData()

    return (
        <ListadoGuitarras
            guitarras={guitarras}
        />
    )
}

export default Guitarras