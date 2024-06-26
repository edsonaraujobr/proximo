import { Header } from '../../componentes/Header.jsx';
import { Student } from '../../componentes/Student.jsx';
import { CheckIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useContext } from "react";
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { StudentContext } from '../../contexts/StudentContext.jsx';

export function ScreenLunch ({children}) {
    const [registration, setRegistration] = useState('');
    const [userType, setUserType] = useState('interno');
    const [paymentType, setPaymentType] = useState('cartao');
    const [money, setMoney] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [searchUser, setSearchUser] = useState(false);
    const [foundUser, setFoundUser] = useState(false);
    const [ quantity, setQuantity ] = useState('');

    const { clerk } = useContext(ClerkContext);
    const { login: loginStudent, student, logout: logoutStudent } = useContext(StudentContext);

    const login = false;

    const handleRegistrationChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9) {
            setRegistration(value);
        }
    };

    function cleanFieldsStudent() {
        setRegistration('');
        setMoney('');
        setPrice('');
        setTotal('');
        setQuantity('');
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
            setMoney('R$ ');
        } else {
            setMoney(price);
        }
    }

    const handleSearchStudent = async (e) => {
        e.preventDefault();
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
        setTotal(calculatePriceQuantity(quantity));

        if(student) {
            if(student.typeAssistance === 'PRAE' || student.typeAssistance === 'prae') {
                setPrice(`R$ 2,00`);
                if(paymentType === 'cartao' || paymentType === 'pix')
                    setMoney(`R$ 2,00`)
            } else if(student.typeAssistance === '50%') {
                setPrice(`R$ ${total/2}`);
                if(paymentType === 'cartao' || paymentType === 'pix')
                    setMoney(`R$ ${total/2}`)
            }
        } else {
            setPrice(total);
            if(paymentType === 'cartao' || paymentType === 'pix')
                setMoney(`R$ ${total}`)
        }
    }

    function calculatePriceQuantity(quantity) {
        const price = 39.37;
        const total = quantity*price;
        return total.toFixed(2);
    }

    function handleMoney(e) {
        let money = e.target.value
        setMoney(money)
    }

    const handleSendService = (e) => {
        e.preventDefault();
        if(userType === 'externo') {
            console.log("externo")
            if(quantity && (paymentType === 'cartao' || paymentType === 'pix')) {
                alert("ok")
            } else if(quantity && paymentType === 'dinheiro') {
                alert("verificar se o valor pago é igual ou superior")
            } else {
                alert("digite a quantidade")
            }
        
        } else if(userType === 'interno') {
            console.log("interno")

            if(student) {
                if(quantity && (paymentType === 'cartao' || paymentType === 'pix')) {
                    alert("ok")
                } else if(quantity && paymentType === 'dinheiro') {
                    alert("verificar se o valor pago é igual ou superior")
                } else {
                    alert("digite a quantidade")
                }
            } else {
                alert("estudante não encontrado")
            }
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
                                            className='bg-green-600 px-2 rounded-md cursor-pointer flex justify-center items-center gap-2' > 
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
                                            onChange={handleQuantityKg}
                                            value={quantity}
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
                                            value={price}
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
                                            type="text"
                                            name="reais"
                                            id="reais"
                                            className='bg-slate-700 rounded-md p-1'
                                            value={money}
                                            onChange={handleMoney}
                                            disabled={paymentType === 'cartao' || paymentType === 'pix'}
                                        />
                                        <button
                                            className='bg-green-600 flex justify-center items-center gap-2 rounded-md'
                                            type='submit'
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
                        <div className='border border-slate-700 w-[920px] h-44 flex justify-center items-center'>
                            <Student
                                registration={student.registration}
                                name={student.name}
                                course={student.course}
                                typeAssistance={student.typeAssistance}
                                photo={student.photo}
                            />                        </div>: 
                        (
                        <div className='border border-slate-700 w-[920px] h-44 flex justify-center items-center'>
                            <span>Usuário não encontrado</span>
                        </div>
                        )
                    ) : 
                    (
                        <div className='w-[920px] h-44 flex justify-center items-center'></div>
                    )
                }
            </div>
        </div>
        )
    )
}