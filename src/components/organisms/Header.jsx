import { Link } from 'react-router-dom';
import Div from '../atoms/Div.jsx';

function Header() {
    return (
        <header className="bg-primary text-primary-foreground p-4 flex items-center">
            <Div className="bg-red-500 mr-4 inline-flex items-center justify-center w-14 h-14 text-shadow-2xs font-heading rounded-2xl font-bold text-[1.3rem]">ASKA</Div>
            <Div className="flex flex-row justify-start w-fit">
                <Link className="mx-2" to="/">Inicio</Link>
                <Link className="mx-2" to="/productos">Productos</Link>
                <Link className="mx-2" to="/contacto">Contacto</Link>
            </Div>
        </header>
    )
}

export default Header;
