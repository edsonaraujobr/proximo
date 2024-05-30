import {ExitIcon, HamburgerMenuIcon} from '@radix-ui/react-icons';

export function Header() {
    return (
        <header className="w-lvw bg-slate-900 px-10 py-4 flex justify-between text-white">
            <div className='gap-3 flex'>
                <button><HamburgerMenuIcon/></button>
                <span>Icone do Programa</span>
                <span>edsonaraujoneto</span>
            </div>
            <div className='gap-3 flex'>
                <span>Foto de Perfil</span>
                <button><ExitIcon/></button>
            </div>
        </header>
    )
}