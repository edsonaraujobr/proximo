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
import { Item } from "../../componentes/Item.jsx";

export function ScreenDinner ({children}) {
    const [registration, setRegistration] = useState('');
    const [userType, setUserType] = useState('interno');
    const [paymentType, setPaymentType] = useState('cartão');
    const [money, setMoney] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [searchUser, setSearchUser] = useState(false);
    const [foundUser, setFoundUser] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const inputPaymentRef = useRef(null)
    const inputRegistrationRef = useRef(null)

    const { clerk } = useContext(ClerkContext);
    const { save: saveStudent, student, remove: removeStudent } = useContext(StudentContext);
    const { service } = useContext(ServiceContext);

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

    const handleAddItem = (counter, setCounter, nameCounter) => () => {
        if(Number(quantity) < 6 && (userType === 'externo' || student) ) {
            var value = 0;
            switch (nameCounter) {
                case "counterCoffee":
                case "counterJuice":
                case "counterPap":
                    if((counterCoffee + counterJuice + counterPap) < 2) {
                        setCounter(counter + 1);
                        setQuantity(quantity + 1);
                        value = priceTotal + 2.86;
                        setPriceTotal(priceTotal + 2.86);
                        addPriceMoney(value.toFixed(2));
                    }
                    break;
                case "counterEgg":
                case "counterChesse":
                case "counterSausage":
                case "counterHam":
                case "counterMeat":
                    if( (counterEgg + counterChesse + counterSausage + counterHam + counterMeat) < 1) {
                        setCounter(counter + 1);
                        setQuantity(quantity + 1);
                        value = priceTotal + 7.70;
                        setPriceTotal(priceTotal + 7.70);
                        addPriceMoney(value.toFixed(2));
                    }
                    break;
                case "counterBread":
                    if( counterBread  < 2) {
                        setCounter(counter + 1);
                        setQuantity(quantity + 1);
                        value = priceTotal + 1.70;
                        setPriceTotal(priceTotal + 1.70);
                        addPriceMoney(value.toFixed(2));
                    }
                    break;
                case "counterCassava":
                case "counterPotato":
                case "counterUndefined":
                    if( (counterCassava + counterPotato + counterUndefined )  < 1) {
                        setCounter(counter + 1);
                        setQuantity(quantity + 1);
                        value = priceTotal + 4.00;
                        setPriceTotal(priceTotal + 4.00);
                        addPriceMoney(value.toFixed(2));
                    }
                    break;

            }
        }
    }

    const handleRemoveItem = (counter, setCounter, nameCounter) => () => {
        setCounter(counter - 1);
        setQuantity(quantity - 1);
        var quantitySynchronized = quantity - 1;
        var value = 0;
        switch (nameCounter) {
            case "counterCoffee":
            case "counterJuice":
            case "counterPap":
                value = priceTotal - 2.86;
                setPriceTotal(priceTotal - 2.86);
                removePriceMoney(value.toFixed(2), quantitySynchronized);
                break;
            case "counterEgg":
            case "counterChesse":
            case "counterSausage":
            case "counterHam":
            case "counterMeat":
                value = priceTotal - 7.70;
                setPriceTotal(priceTotal - 7.70);
                removePriceMoney(value.toFixed(2), quantitySynchronized);
                break;
            case "counterBread":
                value = priceTotal - 1.70;
                setPriceTotal(priceTotal - 1.70);
                removePriceMoney(value.toFixed(2), quantitySynchronized);
                break;
            case "counterCassava":
            case "counterPotato":
            case "counterUndefined":
                value = priceTotal - 4.00;
                setPriceTotal(priceTotal - 4.00);
                removePriceMoney(value.toFixed(2), quantitySynchronized);
                break;
        }
    }

    const addPriceMoney = (value) => {
        if(student) {
            if(student.typeAssistance === 'PRAE' || student.typeAssistance === 'prae' && (paymentType === 'cartão' || paymentType === 'pix')) {
                setPrice((2.00).toFixed(2));
                setMoney((2.00).toFixed(2));
            } else if(student.typeAssistance === '50%' && (paymentType === 'cartão' || paymentType === 'pix')) {
                let totalLocale =  value/2;
                setPrice(totalLocale);
                setMoney(totalLocale);
            }
        } else {
            if(paymentType === 'cartão' || paymentType === 'pix') {
                let totalLocale =  value;
                setPrice(totalLocale);
                setMoney(totalLocale);
            }
        }
    }

    const removePriceMoney = (value, quantitySynchronized) => {
        if(student) {
            if((student.typeAssistance === 'PRAE' || student.typeAssistance === 'prae') && quantitySynchronized === 0 && (paymentType === 'cartão' || paymentType === 'pix')) {
                setPrice(0);
                setMoney(0);
            } else if(student.typeAssistance === '50%' && (paymentType === 'cartão' || paymentType === 'pix')) {
                let totalLocale =  value/2;
                setPrice(totalLocale);
                setMoney(totalLocale);
            }
        } else {
            if(paymentType === 'cartão' || paymentType === 'pix') {
                let totalLocale =  value;
                setPrice(totalLocale);
                setMoney(totalLocale);
            }
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
        if(userType === 'interno'){
            focusInputRegistration();
        }
    }, [userType]);

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
        setPaymentType('cartão');
        cleanQuantityItems();
    }

    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setUserType(newUserType);
        removeStudent();
        cleanFieldsStudent();
    }

    const handlePaymentChange = (e) => {
        if(Number(price) >= 0 && Number(quantity) > 0) {
            setPaymentType(e.target.value);
            if(e.target.value === 'dinheiro') {
                setMoney(0);
            } else {
                setMoney(price);
            }
        }
    }

    const handleSearchStudent = async (e) => {
        e.preventDefault();
        
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
                setFoundUser(true);
                saveStudent(data.responseStudent);
            } else {
                setFoundUser(false);
            }
        } catch (error) {
            alert("ERRO! Não conseguimos conectar ao servidor para encontrar o aluno");
        }
        
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
            if(Number(quantity) > 0 && Number(priceTotal) > 0 && Number(money) > 0 && (paymentType === 'cartão' || paymentType === 'pix')) {
                handleCreateOrder();
            } else if(Number(quantity) > 0 && Number(priceTotal) > 0 && Number(money) > 0 && paymentType === 'dinheiro') {
                if(Number(money) >= Number(price)) {
                    handleCreateOrder();
                } else {
                    alert("ERRO! Valor insuficiente");
                }
            } else {
                alert("ERRO! Digite a quantidade");
            }
        
        } else if(userType === 'interno') {

            if(student) {
                if(Number(quantity) > 0 && Number(priceTotal) > 0 && Number(money) > 0 && (paymentType === 'cartão' || paymentType === 'pix')) {
                    handleCreateOrder();
                } else if(Number(quantity) >0 && Number(priceTotal) > 0 && Number(money) > 0 && paymentType === 'dinheiro' ) {
                    if(Number(money) >= Number(price)) {
                        handleCreateOrder();
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
        navigate(`/atendente/home`);
    }

    const handleCreateOrder = async () => {
        try {
            const  orderData = {
                price_total: Number(priceTotal),
                price: Number(price),
                type_payment: paymentType.toUpperCase(),
                quantity_items: Number(quantity),
                id_service: Number(service)
            }

            if(student && student.registration) {
                orderData.registration_student = student.registration;
            }

            const response = await fetch("http://localhost:3030/order", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( orderData )
            })

            if(response.ok) {
                cleanFieldsStudent();
                alert("Atendimento realizado com sucesso");
                alert("Troco: " + (money-price).toFixed(2))
            } else {
                alert("Erro no servidor");
            }
        } catch(error) {
            alert("ERRO! Não conseguimos conectar ao servidor para enviar o atendimento");
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if((userType === 'externo' || student) && paymentType !== 'dinheiro') {
                switch(event.keyCode) {
                    case 55:
                    case 103:
                        if(((counterJuice + counterPap + counterCoffee) < 2 )) 
                            handleAddItem(counterCoffee, setCounterCoffee, "counterCoffee")();
                        break;
                    case 56:
                    case 104:
                        if(((counterJuice + counterPap + counterCoffee) < 2 )) 
                            handleAddItem(counterJuice, setCounterJuice, "counterJuice")();
                        break;
                    case 57:
                    case 105:
                        if(((counterJuice + counterPap + counterCoffee) < 2 )) 
                            handleAddItem(counterPap, setCounterPap, "counterPap")();
                        break;
                    case 49:
                    case 97:
                        if ((counterChesse + counterEgg + counterHam + counterSausage + counterMeat) < 1)
                            handleAddItem(counterHam, setCounterHam, "counterHam")();
                        break;
                    case 50:
                    case 98:
                        if ((counterChesse + counterEgg + counterHam + counterSausage + counterMeat) < 1)
                            handleAddItem(counterMeat, setCounterMeat, "counterMeat")();
                        break;
                    case 52:
                    case 100:
                        if ((counterChesse + counterEgg + counterHam + counterSausage + counterMeat) < 1)
                            handleAddItem(counterEgg, setCounterEgg, "counterEgg")();
                        break;
                    case 53:
                    case 101:
                        if ((counterChesse + counterEgg + counterHam + counterSausage + counterMeat) < 1)
                            handleAddItem(counterSausage, setCounterSausage, "counterSausage")();
                        break;
                    case 54:
                    case 102:
                        if ((counterChesse + counterEgg + counterHam + counterSausage + counterMeat) < 1)
                            handleAddItem(counterChesse, setCounterChesse, "counterChesse")();
                        break;
                    case 51:
                    case 99:
                        if(counterBread < 2)
                            handleAddItem(counterBread, setCounterBread, "counterBread")();
                        break;
                    case 48:
                        if((counterPotato + counterCassava + counterUndefined) < 1 && !(event.shiftKey)) 
                            handleAddItem(counterCassava, setCounterCassava, "counterCassava")();
                        break;
                    case 189:
                        if((counterPotato + counterCassava + counterUndefined) < 1) 
                            handleAddItem(counterPotato, setCounterPotato, "counterPotato")();
                        break;
                    case 187:
                        if((counterPotato + counterCassava + counterUndefined) < 1 && !(event.shiftKey)) 
                            handleAddItem(counterUndefined, setCounterUndefined, "counterUndefined")();
                        break;
                }
                if(event.shiftKey) {
                    if ((event.shiftKey && event.keyCode === 36) && counterCoffee > 0) {
                        handleRemoveItem(counterCoffee, setCounterCoffee, "counterCoffee")();
                    }
                    if((event.shiftKey && event.keyCode === 38) && counterJuice > 0) {
                        handleRemoveItem(counterJuice, setCounterJuice, "counterJuice")();
                    } 
                    if((event.shiftKey && event.keyCode === 33) && counterPap > 0) {
                        handleRemoveItem(counterPap, setCounterPap, "counterPap")();
                    } 
                    if ((event.shiftKey && event.keyCode === 37) && counterEgg > 0) {
                        handleRemoveItem(counterEgg, setCounterEgg, "counterEgg")();
                    } 
                    if ((event.shiftKey && event.keyCode === 12) && counterSausage > 0) {
                        handleRemoveItem(counterSausage, setCounterSausage, "counterSausage")();
                    } 
                    if ((event.shiftKey && event.keyCode === 39) && counterChesse > 0) {
                        handleRemoveItem(counterChesse, setCounterChesse, "counterChesse")();
                    } 
                    if ((event.shiftKey && event.keyCode === 35) && counterHam > 0) {
                        handleRemoveItem(counterHam, setCounterHam, "counterHam")();
                    } 
                    if ((event.shiftKey && event.keyCode === 40) && counterMeat > 0) {
                        handleRemoveItem(counterMeat, setCounterMeat, "counterMeat")();
                    } 
                    if ((event.shiftKey && event.keyCode === 34) && counterBread > 0) {
                        handleRemoveItem(counterBread, setCounterBread, "counterBread")();
                    } 
                    if ((event.shiftKey && event.keyCode === 48) && counterCassava > 0) {
                        handleRemoveItem(counterCassava, setCounterCassava, "counterCassava")();
                    } 
                    if ((event.shiftKey && event.keyCode === 189) && counterPotato > 0) {
                        handleRemoveItem(counterPotato, setCounterPotato, "counterPotato")();
                    } 
                    if ((event.shiftKey && event.keyCode === 187) && counterUndefined > 0) {
                        handleRemoveItem(counterUndefined, setCounterUndefined, "counterUndefined")();
                    } 
                }

            }

        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleAddItem, counterCoffee, setCounterCoffee, quantity, userType, student, priceTotal, addPriceMoney]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 55 && event.shiftKey) { 
                handleAddItem(counterCoffee, setCounterCoffee, "counterCoffee")();
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleAddItem, counterCoffee, setCounterCoffee, quantity, userType, student, priceTotal, addPriceMoney]);
    

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
                                    <form onSubmit={handleSearchStudent} className='flex gap-2 flex-col '>
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
                                            disabled={userType === 'externo' ||  student || registration < 190000000} 
                                            className={`${(userType === 'externo' ||  student || registration < 190000000 ) ? 'bg-gray-500 ' : 'bg-green-600 hover:bg-green-700'}px-2 rounded-md flex justify-center items-center gap-2`} > 
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

                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='font-bold text-lg'>Itens</h2>
                                    <div className='flex flex-col items-end'>
                                        { quantity !== 0 ? (
                                            <span className='text-sm'>
                                                Quantidade de itens: {quantity} 
                                            </span>
                                        ) : null}
                                        { price !== 0 ? (
                                            <span className='text-sm'>
                                                Subtotal: R$ {price} 
                                            </span>
                                        ) : null
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-2 flex-col items-center justify-center w-full'>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterCoffee}
                                            handleAddItem={handleAddItem(counterCoffee, setCounterCoffee, "counterCoffee")}
                                            handleRemoveItem={handleRemoveItem(counterCoffee, setCounterCoffee, "counterCoffee" )}
                                            nameItem="Café"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"    
                                            disabled={ (counterJuice + counterPap + counterCoffee) === 2 }                            
                                        />
                                        <Item
                                            countItem={counterJuice}
                                            handleAddItem={handleAddItem(counterJuice, setCounterJuice, "counterJuice")}
                                            handleRemoveItem={handleRemoveItem(counterJuice, setCounterJuice, "counterJuice")}
                                            nameItem="Suco"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"
                                            disabled={ (counterJuice + counterPap + counterCoffee) === 2 }                            
                                        />
                                        <Item
                                            countItem={counterPap}
                                            handleAddItem={handleAddItem(counterPap, setCounterPap, "counterPap")}
                                            handleRemoveItem={handleRemoveItem(counterPap, setCounterPap, "counterPap")}
                                            nameItem="Mingau"
                                            colorButton="bg-yellow-600"
                                            hoverColorButton="bg-yellow-700"
                                            disabled={ (counterJuice + counterPap + counterCoffee) === 2 }                            
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterEgg}
                                            handleAddItem={handleAddItem(counterEgg, setCounterEgg, "counterEgg")}
                                            handleRemoveItem={handleRemoveItem(counterEgg, setCounterEgg, "counterEgg")}
                                            nameItem="Ovo"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                            disabled={(counterEgg + counterChesse + counterHam + counterMeat + counterSausage) === 1}
                                        />
                                        <Item
                                            countItem={counterSausage}
                                            handleAddItem={handleAddItem(counterSausage, setCounterSausage, "counterSausage")}
                                            handleRemoveItem={handleRemoveItem(counterSausage, setCounterSausage,"counterSausage" )}
                                            nameItem="Salsicha"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                            disabled={(counterEgg + counterChesse + counterHam + counterMeat + counterSausage) === 1}
                                        />
                                        <Item
                                            countItem={counterChesse}
                                            handleAddItem={handleAddItem(counterChesse, setCounterChesse, "counterChesse")}
                                            handleRemoveItem={handleRemoveItem(counterChesse, setCounterChesse, "counterChesse")}
                                            nameItem="Queijo"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                            disabled={(counterEgg + counterChesse + counterHam + counterMeat + counterSausage) === 1}
                                        />
                                    </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterHam}
                                            handleAddItem={handleAddItem(counterHam, setCounterHam, "counterHam")}
                                            handleRemoveItem={handleRemoveItem(counterHam, setCounterHam,"counterHam" )}
                                            nameItem="Presunto"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                            disabled={(counterEgg + counterChesse + counterHam + counterMeat + counterSausage) === 1}
                                        />
                                        <Item
                                            countItem={counterMeat}
                                            handleAddItem={handleAddItem(counterMeat, setCounterMeat, "counterMeat")}
                                            handleRemoveItem={handleRemoveItem(counterMeat, setCounterMeat, "counterMeat")}
                                            nameItem="Carne"
                                            colorButton="bg-red-500"
                                            hoverColorButton="bg-red-600"
                                            disabled={(counterEgg + counterChesse + counterHam + counterMeat + counterSausage) === 1}
                                        />
                                        <Item
                                            countItem={counterBread}
                                            handleAddItem={handleAddItem(counterBread, setCounterBread, "counterBread")}
                                            handleRemoveItem={handleRemoveItem(counterBread, setCounterBread, "counterBread")}
                                            nameItem="Pão"
                                            colorButton="bg-blue-500"
                                            hoverColorButton="bg-blue-600"
                                            disabled={(counterBread) === 2}
                                        />
                                </div>
                                    <div className='flex gap-2'>
                                        <Item
                                            countItem={counterCassava}
                                            handleAddItem={handleAddItem(counterCassava, setCounterCassava, "counterCassava")}
                                            handleRemoveItem={handleRemoveItem(counterCassava, setCounterCassava, "counterCassava")}
                                            nameItem="Aipim"
                                            colorButton="bg-purple-500"
                                            hoverColorButton="bg-blue-600"
                                            disabled={(counterCassava + counterPotato + counterUndefined) === 1}
                                        />
                                        <Item
                                            countItem={counterPotato}
                                            handleAddItem={handleAddItem(counterPotato, setCounterPotato, "counterPotato")}
                                            handleRemoveItem={handleRemoveItem(counterPotato, setCounterPotato, "counterPotato")}
                                            nameItem="Batata Doce"
                                            colorButton="bg-purple-500"
                                            hoverColorButton="bg-blue-600"
                                            disabled={(counterCassava + counterPotato + counterUndefined) === 1}
                                        />
                                        <Item
                                            countItem={counterUndefined}
                                            handleAddItem={handleAddItem(counterUndefined, setCounterUndefined, "counterUndefined")}
                                            handleRemoveItem={handleRemoveItem(counterUndefined, setCounterUndefined,"counterUndefined" )}
                                            nameItem="Outro"
                                            colorButton="bg-slate-500"
                                            hoverColorButton="bg-slate-600"
                                            disabled={(counterCassava + counterPotato + counterUndefined) === 1}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`${ Number(price) >= 0 && Number(quantity) > 0  ? 'border-green-700 hover:border-green-500' : 'border-slate-700' } border  p-5 flex flex-col gap-2 rounded-md items-center`}>
                                <div className='flex w-full'>
                                    <h2 className='font-bold text-lg'>Forma de pagamento</h2>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                disabled={Number(price) < 0 && Number(quantity) <= 0}
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
                                                disabled={Number(price) < 0 && Number(quantity) <= 0}
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
                                                disabled={Number(price) < 0 && Number(quantity) <= 0}
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
                                            value={Number(money) > 0 && Number(quantity) > 0 ? (typeof money === 'string' && money.startsWith('R$ ') ? money : `R$ ${money}`) : ''}
                                            onChange={handleMoney}
                                            disabled={(userType ==='interno' && student === null) || Number(quantity) <= 0  || paymentType !== 'dinheiro'}
                                        />
                                        <button
                                            className={`${(userType === 'interno' && student === null) || Number(quantity) <= 0 || Number(money) <= 0 || Number(price) <= 0 || Number(priceTotal) <= 0 || Number(money) < Number(price) ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} flex justify-center items-center gap-2 rounded-md`}
                                            type='submit'
                                            disabled={(userType ==='interno' && student === null) || Number(quantity) <= 0 || Number(money) <= 0 || Number(price) <= 0 || Number(priceTotal) <= 0|| Number(money) < Number(price)} 
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