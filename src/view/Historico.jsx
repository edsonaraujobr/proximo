import { PlusCircledIcon, FileTextIcon, EyeOpenIcon, Cross1Icon, CheckIcon} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog'; // biblioteca de modals
import {Button} from './componentes/Button.jsx';
import { Header } from './componentes/Header.jsx'
import {Footer} from './componentes/Footer.jsx'

export function Historico({onButtonExit}) {
    return (
        <Dialog.Root>
        <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4'>
            <Header
                onButtonExit={onButtonExit}
            />

            <div className='flex'>
                <div className='flex gap-2 px-10 justify-end w-full'>
                    <input type="search" className='bg-slate-900 rounded-md p-1 font-light ' placeholder='Pesquise atendimentos...' />
                    <Dialog.Trigger>
                        <Button
                            cor='bg-green-700'
                            texto='Novo Atendimento'
                            hover='bg-green-900'
                            icone={<PlusCircledIcon/>}
                            
                        />
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                <Cross1Icon/>
                            </Dialog.Close>
                            <section className='flex w-full h-full justify-center items-center text-white'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <h2>Tipo de refeição</h2>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-cafe-manha" />
                                            <label htmlFor="id-cafe-manha">Café da manhã</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-almoco" />
                                            <label htmlFor="id-almoco">Almoço</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-jantar" />
                                            <label htmlFor="id-jantar">Jantar</label>
                                        </div>
                                    </div>
                                    <Button
                                        cor='bg-green-800'
                                        texto='Iniciar'
                                        icone={<CheckIcon/>}
                                    />
                                </div>
                                
                            </section>
                        </Dialog.Content>
                    </Dialog.Portal>
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
        </Dialog.Root>
    )
}