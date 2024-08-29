import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { AdministratorContext } from '../../contexts/AdministratorContext.jsx'; 
import Modal from '../../componentes/Modal.jsx'

export function Login({ typeUser, otherUser}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarioNaoEncontrado, setUsuarioNaoEncontrado] = useState(false);
  const navigate = useNavigate();
  const { login: loginClerk } = useContext(ClerkContext);
  const { login: loginAdministrator } = useContext(AdministratorContext);

  const [openModal, setOpenModal]=useState(false);
  const [openModalCode, setOpenModalCode]=useState(false);
  const [openModalNewPassword, setOpenModalNewPassword]=useState(false);
  const [EmailNaoEncontrado, setEmailNaoEncontrado] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [passwordsDifferent, setPasswordDifferent] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const cleanFields = () => {
    setEmail('');
    setPassword('');
  }

  const handleUserChange = () => {
    cleanFields();
    return navigate(`/${otherUser}`)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3030/${typeUser}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if(typeUser === 'clerk') {

              const clerk = data.responseClerk
              loginClerk(clerk)

              const decodedToken = JSON.parse(atob(clerk.token.split('.')[1]));
              const expirationTime = decodedToken.exp * 1000; 
      
              localStorage.setItem(`${typeUser}_authToken`, clerk.token);
              localStorage.setItem(`${typeUser}_tokenExpiration`, expirationTime);

              navigate(`/clerk/home`)
            } else if(typeUser === 'administrator') {
              
              const adm = data.user;
              loginAdministrator(adm)

              const decodedToken = JSON.parse(atob(adm.token.split('.')[1]));
              const expirationTime = decodedToken.exp * 1000; 

              localStorage.setItem(`${typeUser}_authToken`, adm.token);
              localStorage.setItem(`${typeUser}_tokenExpiration`, expirationTime);

              navigate(`/administrator/home`)
            
            }

        } else {
            setUsuarioNaoEncontrado(true);
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleSendRecoveryCode = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/${typeUser}/send-recovery-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailNaoEncontrado(false);
        setOpenModal(false);
        setOpenModalCode(true);
      } else {
        setEmailNaoEncontrado(true);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleRecoveryCodeChange = (e) => setRecoveryCode(e.target.value);

  const handleVerifyRecoveryCode = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/${typeUser}/verify-recovery-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: recoveryCode }),
      });

      if (response.ok) {
        setCodeInvalid(false);
        setOpenModalNewPassword(true);
        setOpenModalCode(false);
      } else {
        setCodeInvalid(true);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {

      setPasswordDifferent(true)
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/${typeUser}/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (response.ok) {
        setPasswordUpdate(true);
        setOpenModalNewPassword(false);

       
      } else {
        alert('Erro ao atualizar a senha');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao conectar ao servidor');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(`${typeUser}_authToken`);
    const tokenExpiration = localStorage.getItem(`${typeUser}_tokenExpiration`);
    
    if (token && tokenExpiration) {
      localStorage.removeItem(`${typeUser}_authToken`);
      localStorage.removeItem(`${typeUser}_tokenExpiration`);
    }
  })

  return (
    <div className='w-lvw h-lvh bg-gradient-to-t from-slate-800 to-slate-900 text-white flex gap-4 flex-col justify-center items-center'>
      <header className="flex flex-col justify-center items-center gap-3">
        <img src={logo} alt="sdsd" className="logo"/>
        <h2 className="font-light text-2xl">
          Entre como <strong className="font-bold">{typeUser === "clerk" ? "Atendente" : "Administrador"}</strong>
        </h2>
      </header>

      <form autoComplete="on" onSubmit={handleSubmit} className=" w-[360px] h-48 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-transparent gap-4 rounded-lg p-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="imain" className="font-bold">Email</label>
            <input
              autoComplete="email"
              type="email"
              name="main"
              id="imain"
              value={email}
              onChange={handleEmailChange}
              required
              onClick={()=>setPasswordUpdate(false)}
              className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"/>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center">
              <label htmlFor="ipassword" className="font-bold">Senha</label>
              <a href="#" className="font-light text-sm underline text-blue-500" onClick={()=>setOpenModal(true)}>Esqueci a senha</a>
            </div>
            <input
              type="password"
              name="password"
              id="ipassword"
              value={password}
              onChange={handlePasswordChange}
              required
              onClick={()=>setPasswordUpdate(false)}
              className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light"/>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <button type="submit" className="w-full bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600" >Entrar</button>
        </div>

      </form>

      <div className="flex w-[360px] h-14 p-2 justify-center items-center rounded-md border border-slate-700">
        <span className="font-bold text-sm">É um {otherUser === "clerk" ? "Atendente" : "Administrador"}? <a className="hover:underline font-light text-blue-500 cursor-pointer" onClick={handleUserChange}>Entre como {otherUser === "clerk" ? "Atendente" : "Administrador"}</a></span>
      </div>

      { usuarioNaoEncontrado && (
          <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
            Usuário não encontrado
          </span>
      ) }

      { passwordUpdate && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
              Senha atualizada com sucesso!
            </span>
      ) }
      
<Modal isOpen={openModal}>
        <form onSubmit={handleSendRecoveryCode} >
          <div className="flex w-full items-center justify-center mb-4">
            <p className="inline font-bold">ESQUECI MINHA SENHA</p>
            <button type="button" 
              className="absolute right-0 p-3 hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-bl-2xl"  
              onClick={() => setOpenModal(false)} 
              >X
            </button>
            
          </div>
          <div>
            { EmailNaoEncontrado && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
              Usuário não encontrado
            </span>
            ) }
          </div>
          
          <input 
            autoComplete="email"
            type="email"
            name="email"
            placeholder="Digite o seu email" 
            id=""
            required
            className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light my-5 text-center w-72"
            value={email}
            onChange={handleEmailChange}
            onClick={()=>setEmailNaoEncontrado(false)}
          />
          <div>
            <button type="submit" className="w-32 bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600">Enviar</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={openModalCode}>
        <form onSubmit={handleVerifyRecoveryCode}>
          <div className="flex w-full items-center justify-center mb-4">
            <p className="inline font-bold">VERIFICAÇÃO DE CÓDIGO</p>
            <button type="button" 
              className="absolute right-0 p-3 hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-bl-2xl"  
              onClick={() => setOpenModalCode(false)}>X
            </button>
          </div>
          {codeInvalid && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
              Código de recuperação inválido
            </span>
          )}
          <input 
            autoComplete="one-time-code"
            type="number"
            name="recoveryCode"
            placeholder="Digite o código de recuperação" 
            required
            value={recoveryCode}

            onChange={handleRecoveryCodeChange}
            onClick={()=>setCodeInvalid(false)}
            className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light my-5 text-center w-72"/>
          <div>
            <button type="submit" className="w-32 bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600" >Verificar</button>
          </div>

        </form>
      </Modal>

      <Modal isOpen={openModalNewPassword}>
        <form onSubmit={handleUpdatePassword}>
          <div className="flex w-full items-center justify-center mb-4">
            <p className="inline font-bold">NOVA SENHA</p>
            <button type="button" 
              className="absolute right-0 p-3 hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-bl-2xl"  
              onClick={() => setOpenModalNewPassword(false)}>X
            </button>
          </div>
          { passwordsDifferent && (
          <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
            As senhas não coincidem
          </span>
          ) }

          <input 
            type="password"
            name="newPassword"
            placeholder="Digite sua nova senha" 
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light my-5 text-center w-72"/>
          <input 
            type="password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder="Confirme sua nova senha" 
            required
            className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light my-5 text-center w-72"/>
          <div>
            <button type="submit" className="w-32 bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600">Atualizar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
