import { useState } from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { obtenerGuitarra } from '~/models/guitarras.server'

export async function loader({params}) {
    const { guitarraUrl } = params

    const guitarra = await obtenerGuitarra(guitarraUrl)

    if(guitarra.data.length === 0) {
        //En caso de que no exista dicha guitarra, envía el error a las funciones de manejo de errores del root.jsx
        throw new Response('', {
            status: 404,
            statusText: 'Guitarra no encontrada'
        })
    }

    return guitarra
}

export function meta({data}) {
    //En Remix es posible obtener en el resto de funciones, como meta o links, los datos extraídos por la función loader. De esta manera se pueden usar en estas funciones.

    if(!data) { //En caso de que no exista dicha guitarra.
        return {
            title: 'GuitarLA - Guitarra No Encontrada',
            description: `Guitarras, venta de guitarras, guitarra no encontrada`
        }
    }

    return {
        title: `GuitarLA - ${data.data[0].attributes.nombre}`,
        description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
}

const Guitarra = () => {
    const { agregarCarrito } = useOutletContext()

    const [cantidad, setCantidad] = useState(0)

    const guitarra = useLoaderData()
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes

    const handleSubmit = e => {
        e.preventDefault()

        if(cantidad < 1) {
            alert('Debes Seleccionar una cantidad')
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }

        agregarCarrito(guitarraSeleccionada)
    }

    return (
        <div className='guitarra'>
            <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

            <div className='contenido'>
                <h3>{nombre}</h3>
                <p className='texto'>{descripcion}</p>
                <p className='precio'>${precio}</p>

                <form onSubmit={handleSubmit} className='formulario'>
                    <label htmlFor='cantidad'>Cantidad</label>

                    <select
                        onChange={e => setCantidad(parseInt(e.target.value))}
                        id='cantidad'
                    >
                        <option value='0'>-- Seleccione --</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>

                    <input
                        type='submit'
                        value='Agregar al carrito'
                    />
                </form>
            </div>
        </div>
    )
}

export default Guitarra