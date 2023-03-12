import { useState, useEffect } from 'react'

import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link
} from '@remix-run/react'

import styles from '~/styles/index.css'

import Header from '~/components/header'
import Footer from '~/components/footer'

export function meta() {
    //El componente Meta importado usará la info que devuelve esta función dentro de la función Document.
    return (
        {
            charset: 'utf-8',
            title: 'GuitarLA - Remix',
            viewport: 'width=device-width,initial-scale=1',
            description: 'Venta de guitarras, blog de música.'
        }
    )
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        }
    ]
}

export default function App() {
    //Outlet renderizará todas las páginas creadas en la carpeta routes dentro de app.

    //Uso de context: El context en remix declarado aquí sólo podrá usarse en el primer nivel de rutas, todos aquellos componentes que estén en rutas anidadas (dentro de carpetas), tendrá que "puentearse" el context al otro context que haya en en siguiente nivel.

    //Se usará localStorage para persistir el carrito del usuario.
    //Se debe comprobar si existe el objeto window, ya que Remix se ejecuta tanto en servidor como en cliente, y en servidor no existe localStorage. De ahí que hagamos la comprobación.
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            //En caso de que agregue un elemento ya agregado, iterar sobre el array e identificar el elemento duplicado, actualizando el valor de cantidad

            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id) {
                    //Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }

                return guitarraState
            })

            setCarrito(carritoActualizado)
        } else {
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        //Función para actualizar las cantidades de las guitarras en el carrito.
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                //Reescribir la cantidad
                guitarraState.cantidad = guitarra.cantidad
            }

            return guitarraState
        })

        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        //Función para eliminar guitarras en el carrito.
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)

        setCarrito(carritoActualizado)
    }

    return (
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    actualizarCantidad,
                    eliminarGuitarra,
                    carrito
                }}
            />
        </Document>
    )
}

function Document({children}) {
    //Elemento para crear la estructura básica de HTML, junto con los elementos meta y links en el head. Luego se importa en la función App como un componente de React, y rendizará todos los elementos hijo que se indiquen entre las etiquetas de Document.

    //El elemento Scripts es FUNDAMENTAL para que los links incluidos en el header funcionen de manera optimizada, sin provocar una recarga de la página. No olvides importarlo de Remix.

    //El elemento LiveReload sirve para que se haga recarga automática del proyecto mientras lo editamos.
    return (
        <html lang='es'>
            <head>
                <Meta />
                <Links />
            </head>

            <body>
                <Header />
                {children}

                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/** Manejo de Errores **/
export function CatchBoundary() {
    const error = useCatch()

    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>

            <Link className='error-enlace' to='/'>Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}

export function ErrorBoundary({error}) {
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>

            <Link className='error-enlace' to='/'>Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}