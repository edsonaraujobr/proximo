import { PlusCircledIcon, FileTextIcon, EyeOpenIcon} from '@radix-ui/react-icons';
import {Button} from './componentes/Button.jsx';
import { Header } from './componentes/Header.jsx'
import {Footer} from './componentes/Footer.jsx'

export function Historico() {
    return (
        <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4'>
            <Header/>

            <div className='flex'>
                <div className='flex gap-2 px-10 justify-end w-full'>
                    <input type="search" className='bg-slate-900 rounded-md p-1 font-light ' placeholder='Pesquise atendimentos...' />
                    <Button
                        cor='bg-green-700'
                        texto='Novo Atendimento'
                        hover='bg-green-900'
                        icone={<PlusCircledIcon/>}
                    />
                </div>
            </div>
            
            <div className='flex flex-col gap-3 px-10'>
                <h2 className='text-2xl'>Ultimos Atendimentos</h2>
                
                <div className='flex flex-col w-full gap-2'>
                    <div className='flex p-4 justify-between items-center bg-slate-900'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Almoço</h1>
                            <span className='font-light text-sm'>27 de maio de 2024</span>
                            <span className='font-light text-sm'>314 clientes atendidos</span>
                        </div>
                        <div className='flex flex-col justify-center gap-2
                        '>
                            {/* <Button
                                cor='bg-slate-950'
                                texto='Imprimir relatório'
                                icone={<FileTextIcon/>}
                            /> */}
                            <Button
                                cor='bg-slate-950'
                                texto='Visualizar relatório'
                                icone={<EyeOpenIcon/>}
                            />
                        </div>
                    </div>

                    <div className='flex p-4 justify-between items-center bg-slate-900'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Almoço</h1>
                            <span className='font-light text-sm'>27 de maio de 2024</span>
                            <span className='font-light text-sm'>314 clientes atendidos</span>
                        </div>
                        <div className='flex flex-col justify-center gap-2
                        '>
                            {/* <Button
                                cor='bg-slate-950'
                                texto='Imprimir relatório'
                                icone={<FileTextIcon/>}
                            /> */}
                            <Button
                                cor='bg-slate-950'
                                texto='Visualizar relatório'
                                icone={<EyeOpenIcon/>}
                            />
                        </div>
                    </div>

                    <div className='flex p-4 justify-between items-center bg-slate-900'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Almoço</h1>
                            <span className='font-light text-sm'>27 de maio de 2024</span>
                            <span className='font-light text-sm'>314 clientes atendidos</span>
                        </div>
                        <div className='flex flex-col justify-center gap-2
                        '>
                            {/* <Button
                                cor='bg-slate-950'
                                texto='Imprimir relatório'
                                icone={<FileTextIcon/>}
                            /> */}
                            <Button
                                cor='bg-slate-950'
                                texto='Visualizar relatório'
                                icone={<EyeOpenIcon/>}
                            />
                        </div>
                    </div>


                </div>

            </div>
            <Footer/>
        </div>
    )
}