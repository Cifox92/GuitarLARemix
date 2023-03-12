import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta() {
    return {
        title: 'GuitarLa - Sobre Nosotros'
    }
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel: 'preload',
            href: imagen,
            as: 'image'
        }
    ]
}

const Nosotros = () => {
    return (
        <main className='contenedor nosotros'>
            <h2 className='heading'>Nosotros</h2>

            <div className='contenido'>
                <img src={imagen} alt='Imagen Nosotros' />

                <div className=''>
                    <p>Quisque maximus sem ac libero blandit posuere. In in tortor pellentesque, varius diam ut, dapibus lorem. Nam tincidunt facilisis lobortis. Mauris sed lectus tincidunt, imperdiet tellus id, varius odio. Maecenas vel congue dui, ac pulvinar purus. Aliquam dictum tortor eu elit congue, non viverra turpis lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

                    <p>Quisque maximus sem ac libero blandit posuere. In in tortor pellentesque, varius diam ut, dapibus lorem. Nam tincidunt facilisis lobortis. Mauris sed lectus tincidunt, imperdiet tellus id, varius odio. Maecenas vel congue dui, ac pulvinar purus. Aliquam dictum tortor eu elit congue, non viverra turpis lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>
            </div>
        </main>
    )
}
 
export default Nosotros