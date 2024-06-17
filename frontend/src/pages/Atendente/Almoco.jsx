import { Header } from '../../componentes/Header.jsx'
import { Button } from '../../componentes/Button.jsx'
import { Footer } from '../../componentes/Footer.jsx'
import { CheckIcon, MagnifyingGlassIcon, EraserIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useContext } from "react"
import { AtendenteContext } from '../../contexts/AtendenteContext.jsx'; 

export function Almoco ({children}) {
    const [matricula, setMatricula] = useState('');
    const [userType, setUserType] = useState('interno')
    const [paymentType, setPaymentType] = useState('cartao')
    const [dinheiro, setDinheiro] = useState('')
    const { atendente } = useContext(AtendenteContext);
    const logado = false;

    const handleMatriculaChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9) {
            setMatricula(value);
        }
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        if(e.target.value === 'externo') {
            setMatricula('');
        }
    }

    const handlePaymentChange = (e) => {
        setPaymentType(e.target.value);
        if(e.target.value === 'dinheiro') {
            setDinheiro('');
        }
    }

    return ( 
        logado ? children : (
        <div className="w-lvw h-lvh bg-slate-800 text-white flex flex-col">
            <Header
                name={atendente.user.nome}
            />

            <div className=' w-full h-full flex flex-col justify-center items-center'>
                <main className='flex justify-center items-center p-5 '>
                    <section className='flex gap-3 w-[920px]'>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Tipo de Usuário</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 justify-between'>
                                    <div className='flex gap-2'>
                                        <input 
                                            type="radio" 
                                            name='usuario' 
                                            id="id-externo"  
                                            value="externo"
                                            checked={userType === 'externo'}
                                            onChange={handleUserTypeChange}
                                        />
                                        <label htmlFor="id-externo">Externo</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input 
                                            type="radio" 
                                            name='usuario' 
                                            id="id-interno"  
                                            value="interno"
                                            checked={userType === 'interno'}
                                            onChange={handleUserTypeChange}
                                        />
                                        <label htmlFor="id-interno">Interno</label>
                                    </div>
                                </div>
                                <div className='flex gap-2 flex-col '>
                                    <label htmlFor="matricula">Nº de matrícula: </label>
                                    <input 
                                        type="number" 
                                        name="interno" 
                                        id="matricula" 
                                        value={matricula}
                                        disabled={userType === 'externo'}
                                        onChange={handleMatriculaChange}
                                        className='bg-slate-700 rounded-md p-1' 
                                        placeholder='000000000'
                                    />
                                    <button 
                                        type="button" 
                                        disabled={userType === 'externo'} 
                                        className='bg-green-600 px-2 rounded-md cursor-pointer flex justify-center items-center gap-2' > 
                                        <MagnifyingGlassIcon/>Buscar
                                    </button>
                                </div>

                            </div>
                            
                        
                        </div>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Pesagem</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="quantidadekg">Quantidade em quilos: </label>
                                    <input 
                                        type="number" 
                                        name="quantidadekg" 
                                        id="quantidadekg" 
                                        className='bg-slate-700 rounded-md p-1' 
                                        placeholder='000.00'
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="resultado">Valor a ser pago: </label>
                                    <input 
                                        type="number" 
                                        name="resultado" 
                                        id="idresultado" 
                                        className='bg-slate-700 rounded-md p-1' 
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=' border border-slate-700 p-5 flex flex-col gap-2 rounded-md items-center'>
                            <div className='flex w-full'>
                                <h2 className='font-bold text-lg'>Forma de pagamento</h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 justify-between'>
                                    <div className='flex gap-2'>
                                        <input 
                                            type="radio" 
                                            name='pagamento' 
                                            id="id-cartao"  
                                            onChange={handlePaymentChange}
                                            value="cartao"
                                            checked={paymentType === 'cartao'}
                                        />
                                        <label htmlFor="id-cartao">Cartão</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input 
                                            type="radio" 
                                            name='pagamento' 
                                            id="id-pix"  
                                            onChange={handlePaymentChange}
                                            value="pix"
                                            checked={paymentType === 'pix'}
                                        />
                                        <label htmlFor="id-pix">Pix</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input 
                                            type="radio" 
                                            name='pagamento' 
                                            id="id-dinheiro"  
                                            onChange={handlePaymentChange}
                                            value="dinheiro"
                                            checked={paymentType === 'dinheiro'}
                                        />
                                        <label htmlFor="id-dinheiro">Dinheiro</label>
                                    </div>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="reais">Valor em reais: </label>
                                    <input 
                                        type="number" 
                                        name="reais" 
                                        id="reais" 
                                        placeholder='00.00' 
                                        className='bg-slate-700 rounded-md p-1' 
                                        value={dinheiro}
                                        disabled={paymentType === 'cartao' || paymentType === 'pix'}
                                    />
                                    <Button
                                        cor='bg-green-600'
                                        texto='Confirmar'
                                        icone={<CheckIcon/>}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>


                </main>
                <div className='border border-slate-700 w-[920px] h-44 flex justify-center items-center'>
                    <span>Aqui vai aparecer o resultado da busca do aluno interno</span>
                </div>
            </div>


            <Footer/>
        </div>
        )
    )
}