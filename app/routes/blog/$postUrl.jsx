import { useLoaderData } from '@remix-run/react'
import { obtenerPost } from '~/models/posts.server'
import { formatearFecha } from '~/utils/helpers'

export async function loader({params}) {
    const { postUrl } = params

    const post = await obtenerPost(postUrl)

    if(post.data.length === 0) {
        //En caso de que no exista dicha guitarra, envía el error a las funciones de manejo de errores del root.jsx
        throw new Response('', {
            status: 404,
            statusText: 'Post no encontrado'
        })
    }

    return post
}

export function meta({data}) {
    //En Remix es posible obtener en el resto de funciones, como meta o links, los datos extraídos por la función loader. De esta manera se pueden usar en estas funciones.

    if(!data) { //En caso de que no exista dicho post.
        return {
            title: 'GuitarLA - Post No Encontrado',
            description: `Guitarras, venta de guitarras, post no encontrado`
        }
    }

    return {
        title: `GuitarLA - ${data.data[0].attributes.titulo}`,
        description: `Guitarras, venta de guitarras, post ${data.data[0].attributes.titulo}`
    }
}

const Post = () => {
    const post = useLoaderData()

    const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes

    return (
        <article className='post mt-3'>
            <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />

            <div className='contenido'>
                <h3>{titulo}</h3>
                <p className='fecha'>{formatearFecha(publishedAt)}</p>
                <p className='texto'>{contenido}</p>

            </div>
        </article>
    )
}
 
export default Post