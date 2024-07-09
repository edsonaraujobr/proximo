import { PlusCircledIcon, FileTextIcon, EyeOpenIcon, Cross1Icon, CheckIcon, ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog'; 
import { Button } from '../../componentes/Button.jsx';
import { Header } from '../../componentes/Header.jsx'
import { useContext, useState, useEffect } from "react"
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../contexts/ServiceContext.jsx';
import moment from 'moment';

export function HomeClerk({children}) {
    const login = false;
    const [typeService, setTypeService] = useState('');
    const { clerk } = useContext(ClerkContext);
    const navigate = useNavigate()
    const { openService } = useContext(ServiceContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // const [searchService, setSearchService] = useState('');
    // const itemsPerPage = 3;
    // const [filterData, setFilterData] = useState([]);

    // const handleSearchService = (event) => {
    //     setSearchService(event.target.value)
    // }

    // const applyfilterData = () => {
    //     if(searchService === '') {
    //         setFilterData(data);
    //     } else {
    //         const filteredData = data.filter(item =>
    //             item.type_service.toLowerCase().includes(searchService.toLowerCase())
    //         );
    
    //         setFilterData(filteredData)
               
    //         const total = Math.ceil(filteredData.length / itemsPerPage);
    //         setTotalPages(total);
    //     }
    // }


    const handlePrintReport = async (id) => {
        try {
            const response = await fetch('http://localhost:3030/getRelatorios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
            if(response.ok) {
                const data = await response.json();
                const dataLocale = data.data;
                const printWindow = window.open('', '', `height=${screen.height},width=${screen.width}`);
                printWindow.document.write('<html><head><title>Relatório de Serviço</title>');
                printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">');
                printWindow.document.write('</head><body class="flex flex-col p-5">');
                printWindow.document.write(`<h1 class="flex justify-center items-center w-full text-xl font-bold">Relatório de Atendimento</h1>`);
                printWindow.document.write(`<main class="flex flex-col gap-4">`)
                printWindow.document.write(`<div class="flex flex-col w-full ">`)
                printWindow.document.write(`<span>Tipo de Serviço: ${dataLocale.type_service}</span>`);
                printWindow.document.write(`<span>Atendente: ${dataLocale.name_clerk.toUpperCase()}</span>`);
                printWindow.document.write(`<span>Data: ${moment(dataLocale.date_service).format("DD-MM-YYYY")}</span>`);
                printWindow.document.write(`<span>Horário: ${moment(dataLocale.date_service).format("HH:mm:ss")}</span>`);
                printWindow.document.write(`<span>Total de clientes: ${dataLocale.total_clients}</span>`);
                printWindow.document.write(`</div>`)
                printWindow.document.write(`<div class="flex justify-between w-full font-bold mb-2">`)
                printWindow.document.write(`<span class="flex-1">Preço total</span>`);
                printWindow.document.write(`<span class="flex-1">Preço pago</span>`);
                printWindow.document.write(`<span class="flex-1">Tipo de pagamento</span>`);
                printWindow.document.write(`<span class="flex-1">Tipo de usuário</span>`);
                printWindow.document.write(`<span class="flex-1">Matricula</span>`);
                if(dataLocale.ordersData[0].quantity_items) {
                    printWindow.document.write(`<span class="flex-1">Quantidade de itens</span>`);
                }
                if(dataLocale.ordersData[0].quantity_kg) {
                    printWindow.document.write(`<span class="flex-1">Peso`);
                }
                printWindow.document.write(`</div>`)
                printWindow.document.write(`</main>`)
                printWindow.document.write(`<div class="bg-black w-full h-1 mb-2"></div>`)
                dataLocale.ordersData.forEach(item => {
                    printWindow.document.write(`<div class="flex justify-between mb-2">`)
                    printWindow.document.write(`<p class="flex-1">R$ ${item.price_total}</p>`);
                    printWindow.document.write(`<p class="flex-1">R$ ${item.price_paid}</p>`);
                    printWindow.document.write(`<p class="flex-1">${item.type_payment}</p>`);
                    if(item.type_assistance) {
                        printWindow.document.write(`<p class="flex-1">${item.type_assistance}</p>`);
                    } else {
                        printWindow.document.write(`<p class="flex-1">EXTERNO</p>`);
                    }
                    if(item.registration_student) {
                        printWindow.document.write(`<p class="flex-1">${item.registration_student}</p>`);
                    } else {
                        printWindow.document.write(`<p class="flex-1">EXTERNO</p>`);
                    }
                    if ( item.quantity_items) {
                        printWindow.document.write(`<p class="flex-1">${item.quantity_items}</p>`);
                    }
                    if ( item.quantity_kg) {
                        printWindow.document.write(`<p class="flex-1">${item.quantity_kg}kg</p>`);
                    }
                    printWindow.document.write(`</div>`)
                });
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            } else {
                alert("Não foi possível buscar este relatório");
            }
        } catch (error) {
            console.error('Erro ao obter os dados do relatório:', error);
        }
    };

    const handleTypeService = (e) => {
        setTypeService(e.target.value)
    };

    const handleStartedService = async (event) => {
        event.preventDefault();

        try {
            const date = new Date().toISOString();
            const response = await fetch("http://localhost:3030/atendimento", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( {date, type_service: typeService.toUpperCase(), id_clerk:clerk.id} )
            });

            if(response.ok) {
                const data = await response.json();
                switch(typeService) {
                    case "café": 
                        navigate(`/atendente/cafe`)
                        break;
                    case "almoço":
                        navigate(`/atendente/almoco`)
                        break;
                    case "jantar":
                        navigate(`/atendente/jantar`)
                        break;
                }

                openService(data.id)
            } else {
                alert("erro!")
            }
        } catch(error) {
            console.error("Erro ao conectar ao servidor", error);
        }

    } 

    const handleClickSettings = () => {
        navigate("/configuracoes")
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            const response = await fetch(`http://localhost:3030/getAtendimentos?page=${page}&limit=3`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( {id:clerk.id} )
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data.results);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    return (
        login ? children : ( 
            <Dialog.Root>
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4'>
                    <Header
                        name={clerk.name}
                        linkPhoto={clerk.photo}
                        onClickedSettings={handleClickSettings}
                    />

                    <div className='flex'>
                        <div className='flex gap-2 px-10 justify-end w-full'>
                            {data ? (
                                <input 
                                    type="search" 
                                    className='bg-slate-900 rounded-md p-1 font-light ' 
                                    placeholder='Pesquise atendimentos...' 
                                />
                            ): null }
                            <Dialog.Trigger>
                                <Button
                                    color='bg-green-700'
                                    text='Novo Atendimento'
                                    hover='bg-green-900'
                                    icon={<PlusCircledIcon/>}
                                    
                                />
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                                    <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                        <Cross1Icon/>
                                    </Dialog.Close>
                                    <form onSubmit={handleStartedService} className='flex w-full h-full justify-center items-center text-white'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2 flex-col'>
                                                <h2 className='font-bold'>Tipo de refeição</h2>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-cafe-manha" value="café" onChange={handleTypeService} required />
                                                    <label htmlFor="id-cafe-manha">Café da manhã</label>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-almoco" value="almoço" onChange={handleTypeService} required/>
                                                    <label htmlFor="id-almoco">Almoço</label>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input type="radio" name="refeicao" id="id-jantar" value="jantar" onChange={handleTypeService} required />
                                                    <label htmlFor="id-jantar">Jantar</label>
                                                </div>
                                            </div>
                                            <button 
                                                type="submit"
                                                className='w-full bg-green-600 rounded-md hover:bg-green-700'
                                            >
                                                Iniciar
                                            </button>
                                        </div>
                                        
                                    </form>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </div>
                    </div>
                    { data.length > 0 ? (
                        <div className='flex flex-col gap-3 px-10'>
                            <h2 className='text-2xl'>Ultimos Atendimentos</h2>

                            <div className='flex flex-col w-full gap-2'>
                                {data.map((item, index) => (
                                    <div key={index} className='flex p-4 justify-between items-center bg-slate-900 border border-transparent hover:border-slate-500 rounded-md'>
                                        <div className='flex flex-col'>
                                            <h1 className='font-bold'>{item.type_service}</h1>
                                            <span className='font-light text-sm'>{`${moment(item.date_service).format('DD-MM-YYYY')} às ${moment(item.date_service).format('HH:mm:ss')} `}</span>
                                            <span className='font-light text-sm'>{item.total_services} clientes atendidos</span>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2'>
                                            <Button
                                                color='bg-slate-950'
                                                text='Visualizar relatório'
                                                icon={<EyeOpenIcon />}
                                                onButtonClicked={() => handlePrintReport(item.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-center gap-2  items-center'>
                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className='cursor-pointer'
                                    >
                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                    </button>
                                    <span>{currentPage} de {totalPages}</span>
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className=' cursor-pointer'
                                    >
                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className='w-full h-full justify-center items-center flex '>
                            <span className='text-xl'><strong>Nenhum atendimento</strong> realizado até o momento....</span>
                        </div>
                    ) }

                    
            
                </div>
            </Dialog.Root>
        )
    )
}