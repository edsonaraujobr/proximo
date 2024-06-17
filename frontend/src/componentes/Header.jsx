import {ExitIcon, HamburgerMenuIcon} from '@radix-ui/react-icons';
import logo from "../assets/logo.png";

export function Header({name,onButtonExit}) {
    return (
        <header className="w-lvw bg-slate-900 px-10 py-4 flex justify-between items-center text-white">
            <div className='gap-3 flex justify-between items-center'>
                <button><HamburgerMenuIcon/></button>
                <img src={logo} className="size-5" />
                <span>{name}</span>
            </div>
            <div className='gap-3 flex justify-between items-center'>
                <span>Foto de Perfil</span>
                <button onClick={onButtonExit}><ExitIcon/></button>
            </div>
        </header>
    )
}