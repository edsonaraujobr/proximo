import {Link} from "react-router-dom"
import logo from "../../assets/logo.png";

export function Home() {
    return (
        <div className="fixed">
            <header className="w-lvw bg-slate-900 px-10 py-4 flex justify-between items-center text-white">
                <div className="flex gap-2 items-center">
                    <img src={logo} className="size-5"/>
                    <span>Próximo</span>
                </div>
                <nav className="flex gap-3 text-lime-500">
                    <Link to="/atendente">Atendente</Link>
                    <Link to="/administrador">Administrador</Link>
                </nav>
            </header>
            <main className="bg-slate-800 w-lvw h-lvh">

            </main>
        </div>

    )
}