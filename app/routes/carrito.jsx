import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import styles from '~/styles/carrito.css'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta() {
    return {
        title: 'GuitarLA - Carrito de Compras',
        description: 'Venta de guitarras, música, blog, carrito de compras, tienda'
    }
}

const Carrito = () => {
    const [total, setTotal] = useState(0)
    const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()

    useEffect(() => {
        const calculoTotal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0)

        setTotal(calculoTotal)
    }, [carrito])

    //Debido al hecho de que Remix se ejecuta tanto en cliente como en servidor, esto provoca un fallo de Hidratación debido a que estamos seteando el carrito con localStorage en Cliente, lo que produce que lo que renderiza en servidor sea diferente a lo renderizado en cliente. Para evitar este fallo se instala la librería remix-utils y se usa ClientOnly, para especificar que este componente concreto sólo renderice en el lado de Cliente.
    return (
        <ClientOnly fallback={'cargando...'}>
            {() => (
                <main className='contenedor'>
                    <h1 className='heading'>Carrito de Compras</h1>

                    <div className='contenido'>
                        <div className='carrito'>
                            <h2>Artículos</h2>

                            {carrito?.length === 0 ? 'Carrito Vacío' : (
                                carrito?.map(producto => (
                                    <div key={producto.id} className='producto'>
                                        <div>
                                            <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                                        </div>

                                        <div>
                                            <p className='nombre'>{producto.nombre}</p>
                                            <p>Cantidad:</p>
                                            
                                            <select
                                                value={producto.cantidad}
                                                className='select'
                                                onChange={e => actualizarCantidad({
                                                    cantidad: +e.target.value,
                                                    id: producto.id
                                                })}
                                            >
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                            </select>

                                            <p className='precio'>$ <span>{producto.precio}</span></p>
                                            <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                                        </div>

                                        <button
                                            type='button'
                                            className='btn_eliminar'
                                            onClick={() => eliminarGuitarra(producto.id)}
                                        >X</button>
                                    </div>
                                ))
                            )}
                        </div>

                        <aside className='resumen'>
                            <h3>Resumen del Pedido</h3>

                            <p>Total a pagar: $ {total}</p>
                        </aside>
                    </div>
                </main>
            )}
        </ClientOnly>
    )
}
 
export default Carrito