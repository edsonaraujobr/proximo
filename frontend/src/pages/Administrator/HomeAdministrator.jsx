import * as Dialog from '@radix-ui/react-dialog'; // biblioteca de modals
import {Button} from '../../componentes/Button.jsx';
import { Header } from '../../componentes/Header.jsx'
import {Footer} from '../../componentes/Footer.jsx'
import { PlusCircledIcon, FileTextIcon, EyeOpenIcon, Cross1Icon, CheckIcon} from '@radix-ui/react-icons';

export function HomeAdministrator ({children}) {
    const logado = false;


    return (
        logado ? children : ( 
            <Dialog.Root>
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4'>
                    <Header/>
                    <main className='flex flex-col gap-3 px-10 h-lvh w-lvw '>
                        
                    </main>
                    <Footer/>
                </div>
            </Dialog.Root>
        )
    )
}