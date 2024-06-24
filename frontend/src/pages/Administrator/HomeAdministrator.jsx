import * as Dialog from '@radix-ui/react-dialog'; 
import { Button } from '../../componentes/Button.jsx';
import { Header } from '../../componentes/Header.jsx'
import { Footer } from '../../componentes/Footer.jsx'
import { useState, useContext } from 'react';
import { PlusCircledIcon, FileTextIcon, EyeOpenIcon, Cross1Icon, CheckIcon} from '@radix-ui/react-icons';
import { ClerkContext } from '../../contexts/ClerkContext.jsx';

export function HomeAdministrator ({children}) {
    const login = false;
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
    const { clerk } = useContext(ClerkContext);

    const handleCreatedStudent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('registration', registration);
            formData.append('typeAssistance', typeAssistance);
            formData.append('name', name);
            formData.append('course', course);
            formData.append('noticeNumber', noticeNumber);
            formData.append('dateStartedAssistance', dateStartedAssistance);
            formData.append('photo', photo);  

            const response = await fetch('http://localhost:3030/registrar-aluno', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                alert("estudante cadastrado");
                console.log("Estudante cadastrado");
                setRegistration('');
                setName('')
                setCourse('')
                setTypeAssistance('');
                setNoticeNumber('');
                setDateStartedAssistance('');
                setPhoto(null);

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
            formData.append('shiftClerk', shiftClerk);
            formData.append('photoClerk', photoClerk);  

            const response = await fetch('http://localhost:3030/registrar-atendente', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                const result = await response.json();
                alert("Atendente cadastrado")
                console.log("Atendente cadastrado", result);
                setNameClerk('');
                setEmailClerk('');
                setPasswordClerk('');
                setShiftClerk('');
                setPhotoClerk(null);
                clerk(result);
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

    return (
        login ? children : ( 
            <Dialog.Root>
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4 fixed'>
                    <Header/>
                    <main className='flex gap-3 px-10 h-lvh w-lvw '>
                        <div className='bg-slate-900 text-white flex flex-col p-3 rounded-md w-[300px]'>
                            <h1 className='bg-slate-500 px-4 rounded-md'>Registrar Aluno</h1>
                            <form className='flex flex-col gap-2' onSubmit={handleCreatedStudent}>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="imatricula" className="font-bold">Matricula: </label>
                                    <input
                                        type="number"
                                        name="matricula"
                                        id="imatricula"
                                        value={registration}
                                        onChange={handleRegistrationChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="inome" className="font-bold">Nome: </label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="inome"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="icurso" className="font-bold">Curso: </label>
                                    <input
                                        type="text"
                                        name="curso"
                                        id="icurso"
                                        value={course}
                                        onChange={handleCourseChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
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
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                    <h2 className="font-bold">Tipo de assistência: </h2>
                                    <div className='flex gap-3'>
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
                                    required
                                    className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"/>
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                <h2 className="font-bold">: </h2>
                                    <input type="file" name="photoClerk" id="iphotoclerk" onChange={handlePhotoChange} />
                                </div>
                                <button type="submit" className='bg-green-500 rounded-md'>Registrar</button>
                            </form>
                        </div>

                        <div className='bg-slate-900 text-white flex flex-col p-3 rounded-md w-[300px]'>
                            <h1 className='bg-slate-500 px-4 rounded-md'>Registrar Atendente</h1>
                            <form className='flex flex-col gap-2' onSubmit={handleCreatedClerk}>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="inome-atendente" className="font-bold">Nome Completo: </label>
                                    <input
                                        type="text"
                                        name="nome-atendente"
                                        id="inome-atendente"
                                        value={nameClerk}
                                        onChange={handleNameClerkChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="iemail" className="font-bold">Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="iemail"
                                        value={emailClerk}
                                        onChange={handleEmailClerkChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="isenha" className="font-bold">Senha: </label>
                                    <input
                                        type="text"
                                        name="senha"
                                        id="isenha"
                                        value={passwordClerk}
                                        onChange={handlePasswordClerkChange}
                                        required
                                        className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full ">

                                    <div className='flex gap-3'>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="turno" id="imatutino" value="matutino" onChange={handleShift} required />
                                            <label htmlFor="imatutino">Matutino</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="turno" id="ivespertino" value="vespertino" onChange={handleShift} required/>
                                            <label htmlFor="ivespertino">Vespertino</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="turno" id="inoturno" value="noturno" onChange={handleShift} required/>
                                            <label htmlFor="inoturno">Noturno</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                <h2 className="font-bold">: </h2>
                                    <input type="file" name="photoClerk" id="iphotoclerk" onChange={handlePhotoClerkChange} />
                                </div>
                                <button type="submit" className='bg-green-500 rounded-md'>Registrar</button>
                            </form>
                        </div>
                    </main>
                </div>
            </Dialog.Root>
        )
    )
}