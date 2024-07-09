import * as Tabs from '@radix-ui/react-tabs';
import { Header } from '../../componentes/Header.jsx'
import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, UploadIcon, ChevronLeftIcon, ChevronRightIcon, Cross2Icon, GearIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { AdministratorContext } from '../../contexts/AdministratorContext.jsx';
import * as Dialog from '@radix-ui/react-dialog'; 

export function HomeAdministrator ({children}) {
    const [ registration, setRegistration ] = useState('');
    const [ name, setName ] = useState('');
    const [ course, setCourse ] = useState('');
    const [ typeAssistance, setTypeAssistance ] = useState('');
    const [ noticeNumber, setNoticeNumber ] = useState('');
    const [ dateStartedAssistance, setDateStartedAssistance ] = useState('');
    const [ photo, setPhoto ] = useState(null);
    const [ nameClerk, setNameClerk ] = useState('');
    const [ emailClerk, setEmailClerk ] = useState('');
    const [ passwordClerk, setPasswordClerk ] = useState('');
    const [ shiftClerk, setShiftClerk ] = useState('');
    const [ photoClerk, setPhotoClerk ] = useState(null);
    const [ idClerk, setIdClerk ] = useState(null) 
    const [listStudent, setListStudent] = useState([]);
    const [currentPageStudent, setCurrentPageStudent] = useState(1);
    const [totalPagesStudent, setTotalPagesStudent] = useState(0);

    const [listClerk, setListClerk] = useState([]);
    const [currentPageClerk, setCurrentPageClerk] = useState(1);
    const [totalPagesClerk, setTotalPagesClerk] = useState(0);
    const [changesMade, setChangesMade] = useState(false);
    
    const { administrator, login: loginAdministrator, logout: logoutAdministrator } = useContext(AdministratorContext);

    const inputRef = useRef(null)
    const inputRefClerk = useRef(null)
    const itens = ["Registrar Aluno","Registrar Atendente", "Visualizar Alunos","Visualizar Atendentes"]
    const [activeTab, setActiveTab] = useState(itens[0]);
    const login = false;
    const navigate = useNavigate()

    const nextPageStudent = () => {
        if (currentPageStudent < totalPagesStudent) {
            setCurrentPageStudent(currentPageStudent + 1);
            fetchStudent(currentPageStudent + 1);
        }
    };

    const prevPageStudent = () => {
        if (currentPageStudent > 1) {
            setCurrentPageStudent(currentPageStudent - 1);
            fetchStudent(currentPageStudent + 1);
        }
    };

    const fetchStudent = useCallback (async (page) => {
        try {
            console.log("chamou aqui")
            const response = await fetch(`http://localhost:3030/listar-alunos?page=${page}&limit=10`);
            if (response.ok) {
                const data = await response.json();
                setListStudent(data.results);
                console.log(listStudent);
                setTotalPagesStudent(data.totalPages)
            } else {
                console.log("Erro ao buscar alunos");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor", error);
        }
    }, []);

    const nextPageClerk = () => {
        if (currentPageClerk < totalPagesClerk) {
            setCurrentPageClerk(currentPageClerk + 1);
            fetchClerk(currentPageClerk + 1);
        }
    };

    const prevPageClerk = () => {
        if (currentPageClerk > 1) {
            setCurrentPageClerk(currentPageClerk - 1);
            fetchClerk(currentPageClerk - 1);
        }
    };

    const fetchClerk = useCallback(async (page) =>{
        try {
            console.log("chamou fetchClerk")
            const response = await fetch(`http://localhost:3030/listar-atendentes?page=${page}&limit=10`);
            if (response.ok) {
                const data = await response.json();
                setListClerk(data.results);
                console.log(listClerk)
                setTotalPagesClerk(data.totalPages)
            } else {
                console.log("Erro ao buscar alunos");
            }
        } catch (error) {
            console.log("Erro ao conectar com o servidor", error);
        }
    }, []);

    const handleClickClerk = () => {
        fetchClerk(currentPageClerk);
    }

    const handleClickStudent = () => {
        fetchStudent(currentPageStudent);
    }

    const handleTabChange = (value) => {
      setActiveTab(value);
      cleanFieldsStudent();
      cleanFieldsClerk();
    };

    const handleCreatedStudent = async (e) => {
        e.preventDefault();
        try {
            console.log("aqui")
            const formData = new FormData();
            formData.append('registration', registration);
            formData.append('typeAssistance', typeAssistance.toUpperCase());
            formData.append('name', name.toUpperCase());
            formData.append('course', course.toUpperCase());
            console.log("aqui")          
            if(noticeNumber && noticeNumber.trim() !== '') 
                formData.append('noticeNumber', noticeNumber.toUpperCase());
            if(dateStartedAssistance && dateStartedAssistance.trim() !== '') 
                formData.append('dateStartedAssistance', dateStartedAssistance);
            if(photo)
                formData.append('photo', photo);
            console.log("aqui")    
            console.log(administrator.id)      
            formData.append('idAdministrator', administrator.id)  
            console.log("aqui")          
            const response = await fetch('http://localhost:3030/registrar-aluno', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                alert("estudante cadastrado");
                cleanFieldsStudent();
            } else {
                alert("estudante não cadastrado")
            }
        } catch(error) {
            alert("erro ao conectar com banco de dados", error)
        }
    }

    const handleCreatedClerk = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nameClerk', nameClerk.toUpperCase());
            formData.append('emailClerk', emailClerk);
            formData.append('passwordClerk', passwordClerk);
            if(shiftClerk && shiftClerk.trim() !== '')
                formData.append('shiftClerk', shiftClerk.toUpperCase());
            if(photoClerk)
                formData.append('photoClerk', photoClerk);  
            console.log(administrator.id)
            formData.append('idAdministrator', administrator.id)    
            console.log("aqui")        
            const response = await fetch('http://localhost:3030/registrar-atendente', {
                method: 'POST',
                body:formData,
            })

            if(response.ok) {
                const result = await response.json();
                alert("Atendente cadastrado")
                cleanFieldsClerk()
            } else {
                alert("Atendente não cadastrado")
            }
        } catch(error) {
            alert("erro ao conectar banco de dados", error);
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
        setChangesMade(true);
    };

    const handleEmailClerkChange = (e) => {
        const value = e.target.value;
        setEmailClerk(value);
        setChangesMade(true);
    };

    const handlePasswordClerkChange = (e) => {
        const value = e.target.value;
        setPasswordClerk(value);
    };

    const handleShift = (e) => {
        const value = e.target.value;
        setShiftClerk(value);
        setChangesMade(true);
    }

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setCourse(value);
        setChangesMade(true);
    };

    const handleTypeAssistanceChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setTypeAssistance(value);
        setChangesMade(true);
    };

    const handleNoticeNumberChange = (e) => {
        const value = e.target.value;
        setNoticeNumber(value);
        setChangesMade(true);
    };

    const handleDateStartedAssistanceChange = (e) => {
        const value = e.target.value;
        setDateStartedAssistance(value);
        setChangesMade(true);
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

    const handleEditClerk = (name, email, shift, id) => {
        setNameClerk(name);
        setEmailClerk(email);
        setShiftClerk(shift);
        setIdClerk(id);
        setChangesMade(false)
    }

    const handleSettingsClerk = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: idClerk, 
                nameClerk: nameClerk.toUpperCase(), 
                emailClerk: emailClerk 
            };

            if(shiftClerk && shiftClerk.trim() !== '')
                data.shiftClerk = shiftClerk.toUpperCase();

            const response = await fetch('http://localhost:3030/atualizar-atendente', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                alert("Atendente atualizado!")
                window.location.reload();
            } else {
                alert("Atendente não atualizado")
            }
        } catch(error) {
            alert("Erro ao conectar banco de dados!");
        }
    }

    const handleRemoveClerkDatas = (id) => {
        setIdClerk(id);
    }

    const handleRemoveClerk = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/remover-atendente', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: idClerk})
            })

            if(response.ok) {
                alert("Atendente REMOVIDO!")
                window.location.reload();
            } else {
                alert("Atendente não removido")
            }
        } catch(error) {
            alert("Erro ao conectar banco de dados!");
        }

    }

    const handleSettingsStudent = async(e) => {
        e.preventDefault();
        try {
            const data = {
                registration: registration, 
                course: course.toUpperCase(), 
                type_assistance: typeAssistance.toUpperCase(),
            };

            if(noticeNumber && noticeNumber.trim() !== '') {
                data.notice_number = noticeNumber;
            }

            if(dateStartedAssistance && noticeNumber.trim() !== '') {
                data.date_started_assistance = dateStartedAssistance;
            }
            const response = await fetch('http://localhost:3030/atualizar-aluno', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                alert("Aluno atualizado!")
                window.location.reload();
            } else {
                alert("Aluno não atualizado")
            }
        } catch(error) {
            alert("Erro ao conectar banco de dados!");
        }
    }

    const handleEditStudent = (registration, name, course, type_assistance, notice_number, date_started_assistance) => {
        setRegistration(registration);
        setName(name);
        setCourse(course);
        setTypeAssistance(type_assistance);
        setNoticeNumber(notice_number);
        setDateStartedAssistance(date_started_assistance);
        setChangesMade(false);
    }

    const handleRemoveStudentDatas = (registration) => {
        setRegistration(registration);
    }

    const handleRemoveStudent = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/remover-aluno', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({registration: registration})
            })

            if(response.ok) {
                alert("Aluno REMOVIDO!")
                window.location.reload();
            } else {
                alert("Aluno não removido")
            }
        } catch(error) {
            alert("Erro ao conectar banco de dados!");
        }

    }

    const handleClickExit = () => {
        navigate("/")
    }

    return (
        login ? children : ( 
                <div className='flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4 fixed'>
                        <Tabs.Root
                            value={activeTab}
                            onValueChange={handleTabChange}
                            className="flex flex-col w-full"
                        >
                            <Header
                                onClickedExit={handleClickExit}
                            />
                            <Tabs.List className="flex px-10 bg-gray-900 justify-start items-center gap-1 rounded-t-md">
                                {itens.map((item) => (
                                    <Tabs.Trigger
                                        onClick={item === "Visualizar Atendentes" ? handleClickClerk : item === "Visualizar Alunos" ? handleClickStudent : undefined}
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
                                                    type="password"
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
                            <Tabs.Content value={itens[2]} >
                                { listStudent.length > 0 ? (
                                    <div>
                                        <div className="p-4 flex gap-28 items-center justify-center">
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2">Matrícula</th>
                                                        <th className="py-2">Nome</th>
                                                        <th className="py-2">Curso</th>
                                                        <th className="py-2">Tipo de Assistência</th>
                                                        <th className="py-2">Número de edital</th>
                                                        <th className="py-2">Data início da assistência</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='text-center'>
                                                    {listStudent.map((student) => (
                                                        <tr key={student.registration} className='hover:bg-slate-700'>
                                                            <td className="border px-4 py-2 text-center">{student.registration}</td>
                                                            <td className="border px-4 py-2 text-center">{student.full_name}</td>
                                                            <td className="border px-4 py-2 text-center">{student.course}</td>
                                                            <td className="border px-4 py-2 text-center">{student.type_assistance}</td>
                                                            { student.notice_number ? <td className="border px-4 py-2 text-center">{student.notice_number}</td> : <td className="border px-4 py-2 text-center">DESCONHECIDO</td> }
                                                            { student.date_started_assistance ? <td className="border px-4 py-2 text-center">{student.date_started_assistance}</td> : <td className="border px-4 py-2 text-center">DESCONHECIDO</td> }
                                                            <td className='border text-center'>
                                                                <Dialog.Root>
                                                                    <Dialog.Trigger>
                                                                        <button type="button" className='px-4 py-2 text-center hover:text-slate-950' onClick={() => handleEditStudent(student.registration,student.full_name,student.course, student.type_assistance, student.notice_number, student.date_started_assistance)}>
                                                                            <GearIcon/>
                                                                        </button>
                                                                    </Dialog.Trigger>
                                                                    <Dialog.Portal>
                                                                        <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                                                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[25vw] md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none text-white justify-center items-center'>
                                                                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                                                                <Cross2Icon/>
                                                                            </Dialog.Close>
                                                                            <form onSubmit={handleSettingsStudent} className='flex flex-col gap-4 w-full h-full justify-center items-center p-6'>
                                                                                <div className="flex flex-col gap-1 w-full">
                                                                                    <label htmlFor="imatricula" className="font-bold">Matricula: </label>
                                                                                    <div className='flex justify-center items-center w-full gap-2 '>
                                                                                        <LockClosedIcon/>
                                                                                        <input
                                                                                            disabled
                                                                                            type="number"
                                                                                            name="matricula"
                                                                                            id="imatricula"
                                                                                            value={registration}
                                                                                            required
                                                                                            className="w-full rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-col gap-1 w-full">
                                                                                    <label htmlFor="inome-aluno" className="font-bold">Nome Completo: </label>
                                                                                    <div className='flex justify-center items-center w-full gap-2 '>
                                                                                        <LockClosedIcon/>
                                                                                        <input
                                                                                            disabled
                                                                                            type="text"
                                                                                            name="nome-aluno"
                                                                                            id="inome-aluno"
                                                                                            value={name}
                                                                                            required
                                                                                            className="w-full rounded-md bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                                                        />
                                                                                    </div>
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
                                                                                            <input type="radio" name="assistance" id="iprae" value="PRAE" onChange={handleTypeAssistanceChange} required checked={"PRAE" === typeAssistance} />
                                                                                            <label htmlFor="iprae">PRAE</label>
                                                                                        </div>
                                                                                        <div className='flex gap-2'>
                                                                                            <input type="radio" name="assistance" id="i50%" value="50%" onChange={handleTypeAssistanceChange} required checked={"50%" === typeAssistance}/>
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
                                                                                        className="rounded-md text-white bg-transparent border border-slate-500 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"
                                                                                    />
                                                                                </div>
                                                                                 
                                                
                                                                                <button 
                                                                                    type="submit" 
                                                                                    className={`w-48 ${changesMade ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800'}  gap-2 flex items-center justify-center py-1 rounded-md `}
                                                                                    disabled={!changesMade}
                                                                                >
                                                                                    
                                                                                    <CheckIcon/>
                                                                                    Salvar alterações
                                                                                </button>                                                 
                                                                            </form>
                                                                        </Dialog.Content>
                                                                    </Dialog.Portal>
                                                                </Dialog.Root>
                                                                <Dialog.Root>
                                                                    <Dialog.Trigger>
                                                                        <button type="button" className='px-4 py-2 text-center hover:text-red-800' onClick={() => handleRemoveStudentDatas(student.registration)}>
                                                                            <Cross2Icon/>
                                                                        </button>
                                                                    </Dialog.Trigger>
                                                                    <Dialog.Portal>
                                                                    <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                                                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                                                                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                                                                <Cross2Icon/>
                                                                            </Dialog.Close>
                                                                            <form onSubmit={handleRemoveStudent} className='flex flex-col gap-4 p-4 text-white justify-center items-center h-full'>
                                                                                <span className='text-center'>Deseja remover o aluno {student.full_name}?</span>
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
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        { totalPagesStudent !== 1 ? (
                                            <div className='flex justify-center gap-2  items-center'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPageStudent}
                                                        disabled={currentPageStudent === 1}
                                                        className='cursor-pointer'
                                                    >
                                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                    <span>{currentPageStudent} de {totalPagesStudent}</span>
                                                    <button
                                                        onClick={nextPageStudent}
                                                        disabled={currentPageStudent === totalPagesStudent}
                                                        className=' cursor-pointer'
                                                    >
                                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null }
                                    </div>
                                ) : (
                                    <div className='w-full h-lvh flex justify-center items-center'>
                                        <span className='text-xl'> Nenhum estudante cadastrado</span>
                                    </div>
                                )}
                                
                            </Tabs.Content>
                            <Tabs.Content value={itens[3]}>
                            { listClerk.length > 0 ? (
                                    <div>
                                        <div className="p-4 flex gap-28 items-center justify-center">
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2">Nome</th>
                                                        <th className="py-2">Email</th>
                                                        <th className="py-2">Turno</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='text-center'>
                                                    {listClerk.map((clerk) => (
                                                        <tr key={clerk.id} className='hover:bg-slate-700'>
                                                            <td className="border px-4 py-2 text-center">{clerk.full_name}</td>
                                                            <td className="border px-4 py-2 text-center">{clerk.email}</td>
                                                            { clerk.shift ? (
                                                                <td className="border px-4 py-2 text-center">{clerk.shift}</td>
                                                            ) : (
                                                                <td className="border px-4 py-2 text-center">DESCONHECIDO</td>
                                                            )}
                                                            <td className='border text-center'>
                                                                <Dialog.Root>
                                                                    <Dialog.Trigger>
                                                                        <button type="button" className='px-4 py-2 text-center hover:text-slate-950' onClick={() => handleEditClerk(clerk.full_name, clerk.email, clerk.shift, clerk.id)}>
                                                                            <GearIcon/>
                                                                        </button>
                                                                    </Dialog.Trigger>
                                                                    <Dialog.Portal>
                                                                        <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                                                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[25vw] md:h-[50vh] bg-slate-700 md:rounded-md flex flex-col outline-none text-white justify-center items-center'>
                                                                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                                                                <Cross2Icon/>
                                                                            </Dialog.Close>
                                                                            <form onSubmit={handleSettingsClerk} className='flex flex-col gap-4 w-full h-full justify-center items-center p-6'>
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
                                                                                    <div className='flex gap-4 flex-col'>
                                                                                    <label htmlFor="imatutino" className="font-bold">Turno: </label>
                                                                                        <div className='flex gap-3'>
                                                                                            <div className='flex gap-2'>
                                                                                                <input type="radio" name="turno" id="imatutino" value="MATUTINO" onChange={handleShift} checked={shiftClerk === 'MATUTINO'} />
                                                                                                <label htmlFor="imatutino">Matutino</label>
                                                                                            </div>
                                                                                            <div className='flex gap-2'>
                                                                                                <input type="radio" name="turno" id="ivespertino" value="VESPERTINO" onChange={handleShift}  checked={shiftClerk === 'VESPERTINO'}/>
                                                                                                <label htmlFor="ivespertino">Vespertino</label>
                                                                                            </div>
                                                                                            <div className='flex gap-2'>
                                                                                                <input type="radio" name="turno" id="inoturno" value="NOTURNO" onChange={handleShift} checked={shiftClerk === 'NOTURNO'}/>
                                                                                                <label htmlFor="inoturno">Noturno</label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                
                                                                                <button 
                                                                                    type="submit" 
                                                                                    className={`w-48 ${changesMade ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800'}  gap-2 flex items-center justify-center py-1 rounded-md `}
                                                                                    disabled={!changesMade}
                                                                                >
                                                                                    
                                                                                    <CheckIcon/>
                                                                                    Salvar alterações
                                                                                </button>                                                 
                                                                            </form>
                                                                        </Dialog.Content>
                                                                    </Dialog.Portal>
                                                                </Dialog.Root>
                                                                <Dialog.Root>
                                                                    <Dialog.Trigger>
                                                                        <button type="button" className='px-4 py-2 text-center hover:text-red-800' onClick={() => handleRemoveClerkDatas(clerk.id)}>
                                                                            <Cross2Icon/>
                                                                        </button>
                                                                    </Dialog.Trigger>
                                                                    <Dialog.Portal>
                                                                    <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                                                                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                                                                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                                                                <Cross2Icon/>
                                                                            </Dialog.Close>
                                                                            <form onSubmit={handleRemoveClerk} className='flex flex-col gap-4 p-4 text-white justify-center items-center h-full'>
                                                                                <span className='text-center'>Deseja remover o atendente {clerk.full_name}?</span>
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
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {totalPagesClerk !== 1 ? (
                                            <div className='flex justify-center gap-2  items-center'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPageClerk}
                                                        disabled={currentPageClerk === 1}
                                                        className='cursor-pointer'
                                                    >
                                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                    <span>{currentPageClerk} de {totalPagesClerk}</span>
                                                    <button
                                                        onClick={nextPageClerk}
                                                        disabled={currentPageClerk === totalPagesClerk}
                                                        className=' cursor-pointer'
                                                    >
                                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className='w-full h-lvh flex justify-center items-center'>
                                        <span className='text-xl'> Nenhum atendente cadastrado</span>
                                    </div>
                                )}
                            </Tabs.Content>
                        </Tabs.Root>
                </div>  
            )
    )
}