import { Header } from '../../componentes/Header.jsx';
import { Student } from '../../componentes/Student.jsx';
import { CheckIcon, MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useContext } from "react";
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { StudentContext } from '../../contexts/StudentContext.jsx';
import * as Dialog from '@radix-ui/react-dialog'; 
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../contexts/ServiceContext.jsx';
import { useRef, useEffect } from 'react';
import { createOrder } from "./functions/createOrder.js";
import { searchStudent } from './functions/searchStudent.js';

export function ScreenLunch () {
    const [registration, setRegistration] = useState('');
    const [userType, setUserType] = useState('interno');
    const [paymentType, setPaymentType] = useState('cartão');
    const [money, setMoney] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [searchUser, setSearchUser] = useState(false);
    const [foundUser, setFoundUser] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const inputQuantityRef = useRef(null)
    const inputPaymentRef = useRef(null)
    const inputRegistrationRef = useRef(null)

    const { clerk } = useContext(ClerkContext);
    const { save: saveStudent, student, remove: removeStudent } = useContext(StudentContext);
    const { service } = useContext(ServiceContext);

    const navigate = useNavigate();
    const priceFood = 39.37;

    const focusInputQuantity = () => {
        if(inputQuantityRef.current) {
            inputQuantityRef.current.focus();
        }
    }

    const focusInputPayment = () => {
        if(inputPaymentRef.current) {
            inputPaymentRef.current.focus();
        }
    }

    const focusInputRegistration = () => {
        if(inputRegistrationRef.current) {
            inputRegistrationRef.current.focus();
        }
    }

    useEffect(() => {
        if (userType === 'externo') {
            focusInputQuantity();
        } else if(userType === 'interno'){
            focusInputRegistration();
        }
    }, [userType]);

    useEffect(() => {
        if (student) {
            focusInputQuantity();
        }
    }, [student]);

    useEffect(() => {
        if (paymentType === 'dinheiro') {
            focusInputPayment();
        }
    }, [paymentType]);

    const handleRegistrationChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9 ) {
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
        removeStudent();
        setPaymentType('cartão')
    }

    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setUserType(newUserType);
        removeStudent();
        cleanFieldsStudent();
    }

    const handlePaymentChange = (e) => {
        if(price >= 0 && quantity >= 0 && quantity.length === 5) {
            setPaymentType(e.target.value);
            if(e.target.value === 'dinheiro') {
                setMoney(0);
            } else {
                setMoney(price);
            }
        }
    }

    const handleQuantityKg = (e) => {
        const handleQuantity = e.target.value;
        if(handleQuantity.length <= 5) {
            setQuantity(handleQuantity);
        }
        if(handleQuantity.length === 5) {
            setQuantity(handleQuantity);
            let totalLocale = calculatePriceQuantity(handleQuantity);

            if(student) {
                if(student.typeAssistance === 'PRAE' || student.typeAssistance === 'prae' && (paymentType === 'cartão' || paymentType === 'pix')) {
                    setPrice(2.00);
                    setMoney(2.00);
                } else if(student.typeAssistance === '50%' && (paymentType === 'cartão' || paymentType === 'pix')) {
                    setPrice(totalLocale/2);
                    setMoney(totalLocale/2);
                }
            } else {
                if(paymentType === 'cartão' || paymentType === 'pix') {
                    setMoney(totalLocale);
                    setPrice(totalLocale);
                }
            }
        }
    }

    function calculatePriceQuantity(quantity) {
        let total = quantity*priceFood;
        total = parseFloat(total.toFixed(2));
        setPriceTotal(total);
        return total;
    }

    function handleMoney(e) {
        let money = e.target.value;
        if(money.length < 10) {
            if (typeof money === 'string' && money.startsWith('R$ ')) {
                money = money.substring(3); 
            }
    
            setMoney(money);
        }
    }

    const handleSendService = (e) => {
        e.preventDefault();
        if(userType === 'externo') {
            if(quantity > 0 && priceTotal > 0 && money > 0 && (paymentType === 'cartão' || paymentType === 'pix')) {
                createOrder(Number(priceTotal), Number(money), Number(price), paymentType.toUpperCase(), Number(quantity), Number(service), student, cleanFieldsStudent);
            } else if(quantity > 0 && priceTotal > 0 && money > 0 && paymentType === 'dinheiro') {
                if(money >= price) {
                    createOrder(Number(priceTotal), Number(money), Number(price), paymentType.toUpperCase(), Number(quantity), Number(service), student, cleanFieldsStudent);
                } else {
                    alert("ERRO! Valor insuficiente");
                }
            } else {
                alert("ERRO! Digite a quantidade");
            }
        
        } else if(userType === 'interno') {

            if(student) {
                if(quantity > 0 && priceTotal > 0 && money > 0 && (paymentType === 'cartão' || paymentType === 'pix')) {
                    createOrder(Number(priceTotal), Number(money), Number(price), paymentType.toUpperCase(), Number(quantity), Number(service), student, cleanFieldsStudent);
                } else if(quantity >0 && priceTotal > 0 && money > 0 && paymentType === 'dinheiro' ) {
                    if(money >= price) {
                        createOrder(Number(priceTotal), Number(money), Number(price), paymentType.toUpperCase(), Number(quantity), Number(service), student, cleanFieldsStudent);
                    } else {
                        alert("ERRO! Valor insuficiente");
                    }
                } else {
                    alert("ERRO! Digite a quantidade");
                }
            } else {
                alert("ERRO! Estudante não encontrado");
            }
        }
    }

    const handleCloseService = (e) => {
        e.preventDefault();
        navigate(`/clerk/home`);
    }

    

    useEffect(() => {
        const token = localStorage.getItem('clerk_authToken');
        const accessed = sessionStorage.getItem('atendimento');
        
        if (!accessed && token) {
            navigate('/clerk/home'); 
        } else {
            sessionStorage.removeItem('atendimento');
        }

        const tokenExpiration = localStorage.getItem('clerk_tokenExpiration');
        
        if (token && tokenExpiration) {
            const isExpired = Date.now() > tokenExpiration;
            
            if (isExpired) {
                handleLogout();
            } else {
                const timeout = setTimeout(() => {
                    handleLogout();
                }, tokenExpiration - Date.now());
                
                return () => clearTimeout(timeout);
            }
        } else 
            handleLogout()
    }, []);
    
      const handleLogout = () => {
          localStorage.removeItem('clerk_authToken');
          localStorage.removeItem('clerk_tokenExpiration');
          navigate("/clerk"); 
      }

    return ( 
        <div className="w-lvw h-lvh bg-slate-800 text-white flex flex-col">
            <Header
                name={clerk.name}
                linkPhoto={clerk.photo}
            />

            <div className=' w-full h-full flex flex-col justify-center items-center'>
                <main className='flex justify-center items-center p-5 '>
                    <section className='flex gap-3 w-[920px justify-center'>
                        <div className=' border border-green-700 hover:border-green-500 p-5 flex flex-col gap-2 rounded-md items-center'>
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
                                    <form onSubmit={(e) => searchStudent(e,setSearchUser, setFoundUser, saveStudent, registration)} className='flex gap-2 flex-col '>
                                        <label htmlFor="matricula">Nº de matrícula: </label>
                                        <input 
                                            ref={inputRegistrationRef}
                                            required
                                            type="number" 
                                            name="interno" 
                                            id="matricula" 
                                            value={registration}
                                            disabled={userType === 'externo'}
                                            onChange={handleRegistrationChange}
                                            className='bg-slate-700 rounded-md p-1 outline-none' 
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={userType === 'externo' || registration.length < 9 || student || registration < 190000000} 
                                            className={`${(userType === 'externo' || registration.length < 9 || student || registration < 190000000 ) ? 'bg-gray-500 ' : 'bg-green-600 hover:bg-green-700'}px-2 rounded-md flex justify-center items-center gap-2`} > 
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
                        <div className={`${ userType === 'externo' || student ? 'border-green-700 hover:border-green-500' : 'border-slate-700 ' } border  p-5 flex flex-col gap-2 rounded-md items-center`}>
                                <div className='flex w-full'>
                                    <h2 className='font-bold text-lg'>Pesagem</h2>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <label htmlFor="quantidadekg">Quantidade em quilos: </label>
                                        <input
                                            ref={inputQuantityRef}
                                            type="number"
                                            name="quantidadekg"
                                            id="quantidadekg"
                                            className='bg-slate-700 rounded-md p-1 outline-none'
                                            onChange={handleQuantityKg}
                                            value={quantity >= 0 ? quantity : ''}
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
                                            value={price >= 0 && quantity >= 0 && quantity.length === 5 ? `R$ ${price}` : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`${ price >= 0 && quantity >= 0 && quantity.length === 5 ? 'border-green-700 hover:border-green-500' : 'border-slate-700' } border  p-5 flex flex-col gap-2 rounded-md items-center`}>
                                <div className='flex w-full'>
                                    <h2 className='font-bold text-lg'>Forma de pagamento</h2>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="radio"
                                                name='pagamento'
                                                id="id-cartão"
                                                onChange={handlePaymentChange}
                                                value="cartão"
                                                checked={paymentType === 'cartão'}
                                            />
                                            <label htmlFor="id-cartão">Cartão</label>
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
                                            ref={inputPaymentRef}
                                            type="text"
                                            name="reais"
                                            id="reais"
                                            className='bg-slate-700 rounded-md p-1 outline-none'
                                            value={money > 0 && quantity > 0 && quantity.length === 5 ? (typeof money === 'string' && money.startsWith('R$ ') ? money : `R$ ${money}`) : ''}
                                            onChange={handleMoney}
                                            disabled={(userType ==='interno' && student === null) || quantity <= 0 || quantity.length !== 5 || paymentType !== 'dinheiro'}
                                        />
                                        <button
                                            className={`${(userType === 'interno' && student === null) || quantity <= 0 || quantity.length !== 5 || money <= 0 || price <= 0 || priceTotal <= 0 || money < price ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} flex justify-center items-center gap-2 rounded-md`}
                                            type='submit'
                                            disabled={(userType ==='interno' && student === null) || quantity <= 0 || quantity.length !== 5 || money <= 0 || price <= 0 || priceTotal <= 0|| money < price}
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
}