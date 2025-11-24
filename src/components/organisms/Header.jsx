import Div from '../atoms/Div.jsx';
import Link from '../atoms/Link.jsx';

function Header() {
    return (
        <header className="bg-primary text-primary-foreground p-4 flex items-center">
            <Div className="bg-red-500 mr-4 inline-flex items-center justify-center w-14 h-14 text-shadow-2xs font-heading rounded-2xl font-bold text-[1.3rem]">ASKA</Div>
            <Link href="/po">gogogo</Link>
        </header>
    )
}

export default Header;