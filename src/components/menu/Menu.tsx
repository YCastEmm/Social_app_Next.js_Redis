import { LinkType } from "@/app/types/link.types";
import Link from "next/link";

type MenuProps = {
    links: LinkType[]
}

const Menu = ({links}: MenuProps) => {
    return (
        <nav className="flex flex-col">
            <ul className="mb-4" style={{ width: 300 }}>
                <li className="text-xl pb-2 w-full hover:bg-blue-400 hover:text-white">
                    <Link href="/" className="p-2 w-full flex">
                        Inicio
                    </Link>
                </li>
                <li className="text-xl pb-2 w-full hover:bg-blue-400 hover:text-white">
                    <Link href="/" className="p-2 w-full flex">
                        Explorar
                    </Link>
                </li>
                <li className="text-xl pb-2 w-full hover:bg-blue-400 hover:text-white">
                    <Link href="/" className="p-2 w-full flex">
                        Perfil
                    </Link>
                </li>
            </ul>
            <button className="button-primary">Publicar</button>
        </nav>
    );
};

export default Menu;



let [numero, setNumero] = useState<number>(0)

const handleClick = () =>{
    setNumero(numero += 1)
}



const Contador = () => { 

    return <button onClick={handleClick}>Sumar 1</button>

}