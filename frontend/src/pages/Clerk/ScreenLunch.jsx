import { Header } from '../../componentes/Header.jsx';
import { Student } from '../../componentes/Student.jsx';
import { CheckIcon, MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useContext } from "react";
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { StudentContext } from '../../contexts/StudentContext.jsx';
import * as Dialog from '@radix-ui/react-dialog'; 
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../contexts/ServiceContext.jsx'

export function ScreenLunch ({children}) {
    const [registration, setRegistration] = useState('');
    const [userType, setUserType] = useState('interno');
    const [paymentType, setPaymentType] = useState('cartao');
    const [money, setMoney] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [searchUser, setSearchUser] = useState(false);
    const [foundUser, setFoundUser] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const { clerk } = useContext(ClerkContext);
    const { login: loginStudent, student, logout: logoutStudent } = useContext(StudentContext);

    const { service } = useContext(ServiceContext);

    const login = false;
    const navigate = useNavigate();

    const handleRegistrationChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9) {
            setRegistration(value);
        }
    };

    function cleanFieldsStudent() {
        setRegistration('');
        setMoney(0);
        setPrice(0);
        setPriceTotal(0);
        setQuantity(0);
        setFoundUser(false);
        setSearchUser(false);
        logoutStudent();
        setPaymentType('cartao')
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        if(e.target.value === 'externo') {
            setRegistration('');
        }
        cleanFieldsStudent();
    }

    const handlePaymentChange = (e) => {
        setPaymentType(e.target.value);
        if(e.target.value === 'dinheiro') {
            setMoney(0);
        } else {
            setMoney(price);
        }
    }

    const handleSearchStudent = async (e) => {
        e.preventDefault();

        setMoney(0);
        setPrice(0);
        setPriceTotal(0);
        setQuantity(0);
        setFoundUser(false);
        setSearchUser(false);
        logoutStudent();
        setPaymentType('cartao')
        
        if(registration.length < 9) {
            alert("menor de 9")
        } else {
            try {
                setSearchUser(true)
                const response = await fetch(`http://localhost:3030/aluno`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ registration }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('Usuário autenticado:', data);
                    setFoundUser(true)
                    loginStudent(data.responseStudent)
                } else {
                    setFoundUser(false)
                }
            } catch (error) {
                console.error('Erro ao conectar ao servidor:', error);
            }
        }

    }

    const handleQuantityKg = (e) => {
        setQuantity(e.target.value);
        calculatePriceQuantity(quantity)

        if(student) {
            if(student.typeAssistance === 'PRAE' || student.typeAssistance === 'prae' && (paymentType === 'cartao' || paymentType === 'pix')) {
                setPrice(2.00);
            } else if(student.typeAssistance === '50%' && (paymentType === 'cartao' || paymentType === 'pix')) {
                setPrice(priceTotal/2);
            }
        } else {
            if(paymentType === 'cartao' || paymentType === 'pix')
                setMoney(priceTotal)
        }
    }

    function calculatePriceQuantity(quantity) {
        const price = 39.37;
        let total = quantity*price;
        total = total.toFixed(2)
        setPriceTotal(total);
        return total;
    }

    function handleMoney(e) {
        let money = e.target.value;
        if (money === 'string' && money.startsWith('R$ ')) {
            money = money.substring(3); 
        }
        alert(money);
        setMoney(money);
    }

    const handleSendService = (e) => {
        e.preventDefault();
        if(userType === 'externo') {
            console.log("externo")
            if(quantity && (paymentType === 'cartao' || paymentType === 'pix')) {
                alert("ok")
                handleCreateOrder();
            } else if(quantity && paymentType === 'dinheiro') {
                alert("verificar se o valor pago é igual ou superior")
            } else {
                alert("digite a quantidade")
            }
        
        } else if(userType === 'interno') {
            console.log("interno")

            if(student) {
                if(quantity && (paymentType === 'cartao' || paymentType === 'pix')) {
                    alert("Atendimento realizado com sucesso")
                    handleCreateOrder();
                } else if(quantity && paymentType === 'dinheiro' ) {
                    if(money >= price) {
                        alert("Atendimento realizado com sucesso")
                        handleCreateOrder();
                    } else {
                        alert("money: " + money + " | price: " + price)
                        alert("Valor insuficiente")
                    }
                } else {
                    alert("ERRO! Digite a quantidade")
                }
            } else {
                alert("Estudante não encontrado")
            }
        }
    }

    const handleCloseService = (e) => {
        e.preventDefault();
        navigate(`/atendente/home`)
    }

    const handleCreateOrder = async () => {
        try {
            const response = await fetch("http://localhost:3030/order", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( {price_total: priceTotal, price , type_payment: paymentType.toUpperCase(), registration_student: student.registration, quantity_kg: quantity, id_service: service} )
            })

            if(response.ok) {
                alert("ENVIADO COM SUCESSO");
                cleanFieldsStudent();
            } else {
                alert("ERRO AO ENVIAR PARA O BD");
            }
        } catch(error) {
            console.error("ERRO!", error)
        }
    }

    return ( 
        login ? children : (
        <div className="w-lvw h-lvh bg-slate-800 text-white flex flex-col">
            <Header
                name={clerk.name}
                linkPhoto={clerk.photo}
            />

            <div className=' w-full h-full flex flex-col justify-center items-center'>
                <main className='flex justify-center items-center p-5 '>
                    <section className='flex gap-3 w-[920px justify-center'>
                        <div className=' border border-slate-700 hover:border-slate-500 p-5 flex flex-col gap-2 rounded-md items-center'>
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
                                { userType === 'interno' ? (
                                    <form onSubmit={handleSearchStudent} className='flex gap-2 flex-col '>
                                        <label htmlFor="matricula">Nº de matrícula: </label>
                                        <input 
                                            required
                                            type="number" 
                                            name="interno" 
                                            id="matricula" 
                                            value={registration}
                                            disabled={userType === 'externo'}
                                            onChange={handleRegistrationChange}
                                            className='bg-slate-700 rounded-md p-1' 
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={userType === 'externo'} 
                                            className='bg-green-600 hover:bg-green-700 px-2 rounded-md cursor-pointer flex justify-center items-center gap-2' > 
                                            <MagnifyingGlassIcon/>Buscar
                                        </button>
                                    </form>
                                ) : (
                                    <div
                                        className=' rounded-md p-1 w-[257px]' 
                                    />
                                )}
                                

                            </div>
                            
                        
                        </div>
                        <form onSubmit={handleSendService} className='flex gap-3 justify-center'>
                            <div className=' border border-slate-700 hover:border-slate-500 p-5 flex flex-col gap-2 rounded-md items-center'>
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
                                            onChange={handleQuantityKg}
                                            value={quantity !== 0 ? quantity : ''}
                                            disabled={userType ==='interno' && student === null}
                                        />
                                    </div>
                                    <div className='flex gap-2 flex-col'>
                                        <span >Valor a ser pago: </span>
                                        <input
                                            type="text"
                                            name="resultado"
                                            id="idresultado"
                                            className='bg-slate-700 rounded-md p-1'
                                            disabled
                                            value={price !== 0 ? `R$ ${price}` : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=' border border-slate-700 hover:border-slate-500 p-5 flex flex-col gap-2 rounded-md items-center'>
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
                                            type="text"
                                            name="reais"
                                            id="reais"
                                            className='bg-slate-700 rounded-md p-1'
                                            value={money !== 0 ? (money.startsWith('R$ ') ? money : `R$ ${money}`) : ''}
                                            onChange={handleMoney}
                                            disabled={paymentType === 'cartao' || paymentType === 'pix' || (userType ==='interno' && student === null) || quantity == 0 }
                                        />
                                        <button
                                            className={`${(userType === 'interno' && student === null) || quantity === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} flex justify-center items-center gap-2 rounded-md`}
                                            type='submit'
                                            disabled={(userType ==='interno' && student === null) || quantity === 0}
                                        >
                                            <CheckIcon/>
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>


                </main>
                { 
                searchUser ? 
                    (
                        foundUser ? 
                        <div className='border border-slate-700 hover:border-slate-500 w-[920px] h-44 flex justify-center items-center'>
                            <Student
                                registration={student.registration}
                                name={student.name}
                                course={student.course}
                                typeAssistance={student.typeAssistance}
                                photo={student.photo}
                            />                        </div>: 
                        (
                        <div className='border border-slate-700 hover:border-slate-500 w-[920px] h-44 flex justify-center items-center'>
                            <span>Estudante não encontrado</span>
                        </div>
                        )
                    ) : 
                    (
                        <div className='w-[920px] h-44 flex justify-center items-center'></div>
                    )
                }
            </div>
            <Dialog.Root className='bg-black flex justify-end'>
                <Dialog.Trigger>
                    <button type="button" className='bg-red-600 px-3 hover:bg-red-700'>
                        Encerrar Atendimento
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                    <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                        <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                            <Cross1Icon/>
                        </Dialog.Close>
                        <form onSubmit={handleCloseService} className='flex flex-col gap-4 p-4 text-white justify-center items-center h-full'>
                            <span className='text-center'>Deseja finalizar o atendimento?</span>
                            <div className='flex gap-2 w-full justify-center items-end'>
                                <Dialog.Close>
                                    <button type="button" className='bg-red-600 px-2 rounded-md hover:bg-red-700'>Cancelar</button>
                                </Dialog.Close>
                                <button type="submit" className='bg-green-600 px-2 rounded-md hover:bg-green-700 '>Confirmar</button>
                            </div>
                        </form>
                    </Dialog.Content>

                </Dialog.Portal>

            </Dialog.Root>
        </div>
        )
    )
}