import { Header } from './componentes/Header.jsx'
import {Button } from './componentes/Button.jsx'
import {Footer} from './componentes/Footer.jsx'
import { CheckIcon, MagnifyingGlassIcon, EraserIcon } from '@radix-ui/react-icons';

export function Atendimento () {
    return (
        <div className="w-lvw h-lvh bg-slate-800 text-white flex flex-col">
            <Header/>

            <div className=' w-full h-full '>
                <main className='flex justify-center items-center p-5 '>
                    <section className='flex gap-3 w-[920px]'>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md justify-center items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Tipo de Usuário</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 justify-between'>
                                    <div className='flex gap-2'>
                                        <input type="radio" name='usuario' id="id-externo"  />
                                        <label htmlFor="id-externo">Externo</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type="radio" name='usuario' id="id-interno"  />
                                        <label htmlFor="id-interno">Interno</label>
                                    </div>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="matricula">Nº de matrícula: </label>
                                    <input type="number" name="interno" id="matricula "  className='bg-slate-700 rounded-md p-1' />
                                </div>
                            </div>
                        </div>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md justify-center items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Forma de pagamento</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 justify-between'>
                                    <div className='flex gap-2'>
                                        <input type="radio" name='pagamento' id="id-cartao"  />
                                        <label htmlFor="id-cartao">Cartão</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type="radio" name='pagamento' id="id-pix"  />
                                        <label htmlFor="id-pix">Pix</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type="radio" name='pagamento' id="id-dinheiro"  />
                                        <label htmlFor="id-dinheiro">Dinheiro</label>
                                    </div>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="matricula">Valor em reais: </label>
                                    <input type="number" name="interno" id="matricula " className='bg-slate-700 rounded-md p-1' />
                                </div>
                            </div>
                        </div>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md justify-center items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Quantidade</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="matricula">Em quilos: </label>
                                    <input type="number" name="interno" id="matricula " className='bg-slate-700 rounded-md p-1' />
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                <div className=' flex w-full justify-center items-center'>
                    
                     <div className='w-[920px] flex justify-end'>
                        <Button
                            cor='bg-green-600'
                            texto='Registrar'
                            icone={<CheckIcon/>}
                        />
                     </div>
                </div>
            </div>


            <Footer/>
        </div>
    )
}