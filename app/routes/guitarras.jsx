//Este archivo renderizará a través del outlet todo aquello que esté dentro de la carpeta routes/guitarras, comenzando por el index.js que contiene el listado de guitarras para mostrar la tienda. Esto Remix lo hace automáticamente al tener este archivo el mismo nombre que la carpeta, permitiendo así montar sistema de routing avanzado (nested routing). Al final este archivo pasa a ser como un template, que sólo tendrá el main con la clase contenedor, y todo lo demás renderizará en el Outlet, siendo necesario únicamente la hoja de estilos, el cual es común tanto para el index como para la ruta dinámica de cada guitarra, ambos archivos presentes en routes/guitarras.
import { Outlet, useOutletContext } from '@remix-run/react'

import styles from '~/styles/guitarras.css'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

const Guitarras = () => {
    return (
        <main className='contenedor'>
            <Outlet
                context={useOutletContext()}
            />
        </main>
    )
}

export default Guitarras