import { Header } from '../../componentes/Header.jsx';
import { Student } from '../../componentes/Student.jsx';
import { CheckIcon, MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useContext } from "react";
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { StudentContext } from '../../contexts/StudentContext.jsx';
import * as Dialog from '@radix-ui/react-dialog'; 
import { useNavigate } from 'react-router-dom';
import { Item } from '../../componentes/Item.jsx';

export function ScreenDinner ({children}) {
    const [registration, setRegistration] = useState('');
    const [userType, setUserType] = useState('interno');
    const [paymentType, setPaymentType] = useState('cartao');
    const [money, setMoney] = useState('');
    const [searchUser, setSearchUser] = useState(false);
    const [foundUser, setFoundUser] = useState(false);
    const [ quantity, setQuantity ] = useState(0);

    const { clerk } = useContext(ClerkContext);
    const { login: loginStudent, student, logout: logoutStudent } = useContext(StudentContext);

    const login = false;
    const navigate = useNavigate();

    const [counterCoffee, setCounterCoffee] = useState(0);
    const [counterJuice, setCounterJuice] = useState(0);
    const [counterPap, setCounterPap] = useState(0);
    const [counterEgg, setCounterEgg] = useState(0);
    const [counterSausage, setCounterSausage] = useState(0);
    const [counterChesse, setCounterChesse] = useState(0);
    const [counterHam, setCounterHam] = useState(0);
    const [counterMeat, setCounterMeat] = useState(0);
    const [counterBread, setCounterBread] = useState(0);
    const [counterCassava, setCounterCassava] = useState(0);
    const [counterPotato, setCounterPotato] = useState(0);
    const [counterUndefined, setCounterUndefined] = useState(0);

    const cleanQuantityItems = () => {
        setCounterCoffee(0);
        setCounterJuice(0);
        setCounterPap(0);
        setCounterEgg(0);
        setCounterSausage(0);
        setCounterChesse(0);
        setCounterHam(0);
        setCounterMeat(0);
        setCounterBread(0);
        setCounterCassava(0);
        setCounterPotato(0);
        setCounterUndefined(0);
    }
    const handleAddItem = (counter, setCounter) => () => {
        if(quantity < 6) {
            setCounter(counter + 1);
            setQuantity(quantity + 1)
        }
    }

    const handleRemoveItem = (counter, setCounter) => () => {
        setCounter(counter - 1);
        setQuantity(quantity - 1)
    }

    const handleRegistrationChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9) {
            setRegistration(value);
        }
    };

    function cleanFieldsStudent() {
        setRegistration('');
        setMoney('');
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
        cleanQuantityItems();
    }

    const handlePaymentChange = (e) => {
        setPaymentType(e.target.value);
        if(e.target.value === 'dinheiro') {
            setMoney('R$ ');
        } else {
            setMoney(money);
        }
    }

    const handleSearchStudent = async (e) => {
        e.preventDefault();

        setMoney('');
        setQuantity(0);
        setFoundUser(false);
        setSearchUser(false);
        logoutStudent();
        setPaymentType('cartao')
        cleanQuantityItems();
        
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

    function handleMoney(e) {
        let money = e.target.value
        setMoney(money)
    }

    const handleSendService = (e) => {
        e.preventDefault();
        if(userType === 'externo') {
            if(quantity !== 0 && (paymentType === 'cartao' || paymentType === 'pix')) {
                alert("ok")
            } else if(quantity !== 0 && paymentType === 'dinheiro') {
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

    // const handleCreateOrder = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3030/order", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify( {paymentType, student.registration, quantity_items: quantity, id_service} )
    //         })
    //     } catch(error) {
    //         console.error("ERRO!", error)
    //     }
    // }

    const handleCloseService = (e) => {
        e.preventDefault();
        navigate(`/atendente/home`)
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
                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='font-bold text-lg'>Itens</h2>
                                    { quantity !== 0 ? (
                                        <span>
                                            Quantidade de itens: {quantity}
                                        </span>
                                    ) : null}
                                </div>
                                <div className='flex gap-2 flex-col items-center justify-center w-full'>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterCoffee}
                                            handleAddItem={handleAddItem(counterCoffee, setCounterCoffee)}
                                            handleRemoveItem={handleRemoveItem(counterCoffee, setCounterCoffee)}
                                            nameItem="Café"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"                                
                                        />
                                        <Item
                                            countItem={counterJuice}
                                            handleAddItem={handleAddItem(counterJuice, setCounterJuice)}
                                            handleRemoveItem={handleRemoveItem(counterJuice, setCounterJuice)}
                                            nameItem="Suco"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"
                                        />
                                        <Item
                                            countItem={counterPap}
                                            handleAddItem={handleAddItem(counterPap, setCounterPap)}
                                            handleRemoveItem={handleRemoveItem(counterPap, setCounterPap)}
                                            nameItem="Mingau"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterEgg}
                                            handleAddItem={handleAddItem(counterEgg, setCounterEgg)}
                                            handleRemoveItem={handleRemoveItem(counterEgg, setCounterEgg)}
                                            nameItem="Ovo"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                        />
                                        <Item
                                            countItem={counterSausage}
                                            handleAddItem={handleAddItem(counterSausage, setCounterSausage)}
                                            handleRemoveItem={handleRemoveItem(counterSausage, setCounterSausage)}
                                            nameItem="Salsicha"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                        />
                                        <Item
                                            countItem={counterChesse}
                                            handleAddItem={handleAddItem(counterChesse, setCounterChesse)}
                                            handleRemoveItem={handleRemoveItem(counterChesse, setCounterChesse)}
                                            nameItem="Queijo"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterHam}
                                            handleAddItem={handleAddItem(counterHam, setCounterHam)}
                                            handleRemoveItem={handleRemoveItem(counterHam, setCounterHam)}
                                            nameItem="Presunto"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                        />
                                        <Item
                                            countItem={counterMeat}
                                            handleAddItem={handleAddItem(counterMeat, setCounterMeat)}
                                            handleRemoveItem={handleRemoveItem(counterMeat, setCounterMeat)}
                                            nameItem="Carne"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                        />
                                        <Item
                                            countItem={counterBread}
                                            handleAddItem={handleAddItem(counterBread, setCounterBread)}
                                            handleRemoveItem={handleRemoveItem(counterBread, setCounterBread)}
                                            nameItem="Pão"
                                            colorButton="bg-blue-500"
                                            hoverColorButton="bg-blue-600"
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterCassava}
                                            handleAddItem={handleAddItem(counterCassava, setCounterCassava)}
                                            handleRemoveItem={handleRemoveItem(counterCassava, setCounterCassava)}
                                            nameItem="Aipim"
                                            colorButton="bg-blue-500"
                                            hoverColorButton="bg-blue-600"
                                        />
                                        <Item
                                            countItem={counterPotato}
                                            handleAddItem={handleAddItem(counterPotato, setCounterPotato)}
                                            handleRemoveItem={handleRemoveItem(counterPotato, setCounterPotato)}
                                            nameItem="Batata Doce"
                                            colorButton="bg-blue-500"
                                            hoverColorButton="bg-blue-600"
                                        />
                                        <Item
                                            countItem={counterUndefined}
                                            handleAddItem={handleAddItem(counterUndefined, setCounterUndefined)}
                                            handleRemoveItem={handleRemoveItem(counterUndefined, setCounterUndefined)}
                                            nameItem="Outro"
                                            colorButton="bg-slate-500"
                                            hoverColorButton="bg-slate-600"
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
                                            value={money}
                                            onChange={handleMoney}
                                            disabled={paymentType === 'cartao' || paymentType === 'pix'}
                                        />
                                        <button
                                            className='bg-green-600 flex justify-center items-center gap-2 rounded-md hover:bg-green-700'
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