import * as Tabs from '@radix-ui/react-tabs';
import { Header } from '../../componentes/Header.jsx'
import { useState, useContext, useRef } from 'react';
import { CheckIcon, UploadIcon } from '@radix-ui/react-icons';
import { AdministratorContext } from '../../contexts/AdministratorContext.jsx';

export function HomeAdministrator ({children}) {
    const [ registration, setRegistration ] = useState('');
    const [ name, setName ] = useState('');
    const [ course, setCourse ] = useState('');
    const [ typeAssistance, setTypeAssistance ] = useState('');
    const [ noticeNumber, setNoticeNumber ] = useState('');
    const [ dateStartedAssistance, setDateStartedAssistance ] = useState('');
    const [photo, setPhoto] = useState(null);
    const [ nameClerk, setNameClerk ] = useState('');
    const [ emailClerk, setEmailClerk ] = useState('');
    const [ passwordClerk, setPasswordClerk ] = useState('');
    const [ shiftClerk, setShiftClerk ] = useState('');
    const [photoClerk, setPhotoClerk] = useState(null);

    const { administrator, login: loginAdministrator, logout: logoutAdministrator } = useContext(AdministratorContext);

    const inputRef = useRef(null)
    const inputRefClerk = useRef(null)
    const itens = ["Registrar Aluno","Registrar Atendente", "Visualizar Alunos","Visualizar Atendentes"]
    const [activeTab, setActiveTab] = useState(itens[0]);
    const login = false;


    const handleTabChange = (value) => {
      setActiveTab(value);
      cleanFieldsStudent();
      cleanFieldsStudent();
    };

    const handleCreatedStudent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('registration', registration);
            formData.append('typeAssistance', typeAssistance.toUpperCase());
            formData.append('name', name.toUpperCase());
            formData.append('course', course.toUpperCase());
            if(noticeNumber.trim() !== '') 
                formData.append('noticeNumber', noticeNumber.toUpperCase());
            if(dateStartedAssistance.trim() !== '') 
                formData.append('dateStartedAssistance', dateStartedAssistance);
            if(photo)
                formData.append('photo', photo);  
            formData.append('idAdministrator', administrator.id)            

            const response = await fetch('http://localhost:3030/registrar-aluno', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                alert("estudante cadastrado");
                console.log("Estudante cadastrado");
                cleanFieldsStudent();
            } else {
                alert("estudante não cadastrado")
                console.log("Estudante não cadastrado");
            }
        } catch(error) {
            console.log("erro ao conectar com banco de dados", error)

        }
    }

    const handleCreatedClerk = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nameClerk', nameClerk);
            formData.append('emailClerk', emailClerk);
            formData.append('passwordClerk', passwordClerk);
            if(shiftClerk.trim() !== '')
                formData.append('shiftClerk', shiftClerk);
            if(photoClerk)
                formData.append('photoClerk', photoClerk);  
            formData.append('idAdministrator', administrator.id)            
            const response = await fetch('http://localhost:3030/registrar-atendente', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                const result = await response.json();
                alert("Atendente cadastrado")
                console.log("Atendente cadastrado", result);
                cleanFieldsClerk()
            } else {
                alert("Atendente não cadastrado")
                console.log("Atendente não cadastrado");
            }
        } catch(error) {
            console.log("erro ao conectar banco de dados", error);
        }
    }

    const handleRegistrationChange = (e) => {
        const value = e.target.value;
        if(value.length <= 9) {
            setRegistration(value);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleNameClerkChange = (e) => {
        const value = e.target.value;
        setNameClerk(value);
    };

    const handleEmailClerkChange = (e) => {
        const value = e.target.value;
        setEmailClerk(value);
    };

    const handlePasswordClerkChange = (e) => {
        const value = e.target.value;
        setPasswordClerk(value);
    };

    const handleShift = (e) => {
        const value = e.target.value;
        setShiftClerk(value);
    }

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setCourse(value);
    };

    const handleTypeAssistanceChange = (e) => {
        const value = e.target.value;
        setTypeAssistance(value);
    };

    const handleNoticeNumberChange = (e) => {
        const value = e.target.value;
        setNoticeNumber(value);
    };

    const handleDateStartedAssistanceChange = (e) => {
        const value = e.target.value;
        setDateStartedAssistance(value);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        setPhoto(file)
    }

    const handlePhotoClerkChange = (e) => {
        const file = e.target.files[0]
        setPhotoClerk(file)
    }

    function cleanFieldsStudent() {
        setRegistration('');
        setName('')
        setCourse('')
        setTypeAssistance('');
        setNoticeNumber('');
        setDateStartedAssistance('');
        setPhoto(null);
    }

    function cleanFieldsClerk() {
        setNameClerk('');
        setEmailClerk('');
        setPasswordClerk('');
        setShiftClerk('');
        setPhotoClerk(null);
    }

    const handleImageStudent = () => {
        inputRef.current.click();
    }

    const handleImageClerk = () => {
        inputRefClerk.current.click();
    }

    return (
        login ? children : ( 
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4 fixed'>
                        <Tabs.Root
                            value={activeTab}
                            onValueChange={handleTabChange}
                            className="flex flex-col w-full"
                        >
                            <Header/>
                            <Tabs.List className="flex px-10 bg-gray-900 justify-start items-center gap-1 rounded-t-md">
                                {itens.map((item) => (
                                <Tabs.Trigger
                                    key={item}
                                    value={item}
                                    className={` text-white text-sm p-2 ${
                                    activeTab === item? 'border-b-2 border-b-slate-400' : 'border-b-transparent'
                                    }`}
                                >
                                {item}
                                </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            <Tabs.Content value={itens[0]}>
                                    <form  onSubmit={handleCreatedStudent} className='flex flex-col justify-center items-center'>
                                        <div className=' text-white p-8 flex gap-28 items-center justify-center '>
                                            <div className='flex flex-col gap-2 w-[50lvw]'>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label htmlFor="imatricula" className="font-bold">Matricula: *</label>
                                                    <input
                                                        type="number"
                                                        name="matricula"
                                                        id="imatricula"
                                                        value={registration}
                                                        onChange={handleRegistrationChange}
                                                        required
                                                        className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label htmlFor="inome" className="font-bold">Nome Completo: *</label>
                                                    <input
                                                        type="text"
                                                        name="nome"
                                                        id="inome"
                                                        value={name}
                                                        onChange={handleNameChange}
                                                        required
                                                        className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label htmlFor="icurso" className="font-bold">Curso: *</label>
                                                    <input
                                                        type="text"
                                                        name="curso"
                                                        id="icurso"
                                                        value={course}
                                                        onChange={handleCourseChange}
                                                        required
                                                        className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label htmlFor="iedital" className="font-bold">Número de edital: </label>
                                                    <input
                                                        type="text"
                                                        name="edital"
                                                        id="iedital"
                                                        value={noticeNumber}
                                                        onChange={handleNoticeNumberChange}
                                                        className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                    />
                                                </div>
                                                <div className="flex gap-4 w-full ">
                                                    <label htmlFor='iprae' className="font-bold">Tipo de assistência: *</label>
                                                    <div className='flex gap-4'>
                                                        <div className='flex gap-2'>
                                                            <input type="radio" name="assistance" id="iprae" value="prae" onChange={handleTypeAssistanceChange} required />
                                                            <label htmlFor="iprae">PRAE</label>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <input type="radio" name="assistance" id="i50%" value="50%" onChange={handleTypeAssistanceChange} required/>
                                                            <label htmlFor="i50%">50%</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label htmlFor="idate" className="font-bold">Data início de assistência: </label>
                                                    <input
                                                    type="date"
                                                    name="date"
                                                    id="idate"
                                                    value={dateStartedAssistance}
                                                    onChange={handleDateStartedAssistanceChange}
                                                    className="rounded-md text-white bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"/>
                                                </div>
                                                <button 
                                                    type="submit" 
                                                    className='w-40 bg-green-600 gap-2 flex items-center justify-center py-1 rounded-md hover:bg-green-700'>
                                                    <CheckIcon/>
                                                    Registrar Aluno
                                                </button> 
                                            </div>
                                            <div className='flex items-center justify-center flex-col gap-4'>
                                                <h1 className="font-bold">Foto: </h1>
                                                <div onClick={handleImageStudent}>
                                                    { photo ? <img className='flex justify-center items-center w-80 h-80 rounded-full cursor-pointer' src={URL.createObjectURL(photo)} alt="Foto" /> : (
                                                        <div className='flex justify-center items-center w-80 h-80 bg-transparent border border-slate-500 rounded-full cursor-pointer'>
                                                            <UploadIcon className='size-14'/>
                                                        </div>
                                                    )}

                                                    <input 
                                                        type="file" 
                                                        ref={inputRef} 
                                                        name="photo" 
                                                        id="iphoto" 
                                                        style={{display: "none"}} 
                                                        onChange={handlePhotoChange} 
                                                    />
                                                </div>
                                            </div>
                                            
                                        </div>
                                   
                                    </form>
                            </Tabs.Content>
                            <Tabs.Content value={itens[1]}>
                                <form className='flex flex-col justify-center items-center' onSubmit={handleCreatedClerk}>

                                    <div className=' text-white p-8 flex gap-28 items-center justify-center'>
                                        <div className='flex flex-col gap-2 w-[50lvw]'> 
                                            <div className="flex flex-col gap-1 w-full">
                                                <label htmlFor="inome-atendente" className="font-bold">Nome Completo: *</label>
                                                <input
                                                    type="text"
                                                    name="nome-atendente"
                                                    id="inome-atendente"
                                                    value={nameClerk}
                                                    onChange={handleNameClerkChange}
                                                    required
                                                    className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <label htmlFor="iemail" className="font-bold">Email: *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="iemail"
                                                    value={emailClerk}
                                                    onChange={handleEmailClerkChange}
                                                    required
                                                    className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <label htmlFor="isenha" className="font-bold">Senha: *</label>
                                                <input
                                                    type="text"
                                                    name="senha"
                                                    id="isenha"
                                                    value={passwordClerk}
                                                    onChange={handlePasswordClerkChange}
                                                    required
                                                    className="rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full ">
                                                <div className='flex gap-4'>
                                                <label htmlFor="imatutino" className="font-bold">Turno: </label>
                                                    <div className='flex gap-2'>
                                                        <input type="radio" name="turno" id="imatutino" value="matutino" onChange={handleShift}  />
                                                        <label htmlFor="imatutino">Matutino</label>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <input type="radio" name="turno" id="ivespertino" value="vespertino" onChange={handleShift} />
                                                        <label htmlFor="ivespertino">Vespertino</label>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <input type="radio" name="turno" id="inoturno" value="noturno" onChange={handleShift} />
                                                        <label htmlFor="inoturno">Noturno</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                type="submit" 
                                                className='w-48 bg-green-600 gap-2 flex items-center justify-center py-1 rounded-md hover:bg-green-700'>
                                                <CheckIcon/>
                                                Registrar Atendente
                                            </button>
                                        </div>
                                        <div className='flex items-center justify-center flex-col gap-4'>
                                            <h1 className="font-bold">Foto: </h1>
                                            <div onClick={handleImageClerk}>
                                                { photoClerk ? <img className='flex justify-center items-center w-80 h-80  rounded-full cursor-pointer' src={URL.createObjectURL(photoClerk)} alt="Foto" /> : (
                                                    <div className='flex justify-center items-center w-80 h-80 bg-transparent border border-slate-500 rounded-full cursor-pointer'>
                                                        <UploadIcon className='size-14'/>
                                                    </div>
                                                )}

                                                <input 
                                                    type="file" 
                                                    ref={inputRefClerk} 
                                                    name="photoClerk" 
                                                    id="iphotoclerk" 
                                                    style={{display: "none"}} 
                                                    onChange={handlePhotoClerkChange} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </Tabs.Content>
                            <Tabs.Content value={itens[2]}>
                                <span>Visualizar aluno</span>
                            </Tabs.Content>
                            <Tabs.Content value={itens[3]}>
                                <span>Visualizar atendente</span>
                            </Tabs.Content>
                        </Tabs.Root>
                </div>  
            )
    )
}