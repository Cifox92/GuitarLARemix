import { Link, useLocation } from '@remix-run/react'
import carritoImg from '../../public/img/carrito.png'

const Navegacion = () => {
    const location = useLocation()
    
    return (
        <nav className='navegacion'>
            <Link 
                to='/'
                className={location.pathname === '/' ? 'active' : ''}
            >
                Inicio 
            </Link>

            <Link 
                to='/nosotros'
                className={location.pathname === '/nosotros' ? 'active' : ''}
            >
                Nosotros
            </Link>

            <Link 
                to='/guitarras'
                className={location.pathname === '/guitarras' ? 'active' : ''}
            >
                Tienda
            </Link>

            <Link 
                to='/blog'
                className={location.pathname === '/blog' ? 'active' : ''}
            >
                Blog
            </Link>

            <Link 
                to='/carrito'
            >
                <img src={carritoImg} alt='carrito de compras' />
            </Link>
        </nav>
    )
}
 
export default Navegacion