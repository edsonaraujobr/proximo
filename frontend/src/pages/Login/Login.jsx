import { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ClerkContext } from '../../contexts/ClerkContext.jsx'; 
import { AdministratorContext } from '../../contexts/AdministratorContext.jsx'; 

export function Login({ typeUser, otherUser}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarioNaoEncontrado, setUsuarioNaoEncontrado] = useState(false);
  const navigate = useNavigate();
  const { login: loginClerk } = useContext(ClerkContext);
  const { login: loginAdministrator } = useContext(AdministratorContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserChange = () => {
    setEmail('');
    setPassword('');
    return navigate(`/${otherUser}`)

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3030/${typeUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Usuário autenticado:', data);
            if(typeUser === 'atendente') {
              loginClerk(data.responseClerk)
              navigate(`/atendente/home`)
            } else if(typeUser === 'administrador') {
              loginAdministrator(data)
              navigate(`/administrador/home`)
            }

        } else {
            setUsuarioNaoEncontrado(true);
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <div className='w-lvw h-lvh bg-gradient-to-t from-slate-800 to-slate-900 text-white flex gap-4 flex-col justify-center items-center'>
      <header className="flex flex-col justify-center items-center gap-3">
        <img src={logo} alt="sdsd" className="logo"/>
        <h2 className="font-light text-2xl">
          Entre como <strong className="font-bold">{typeUser}</strong>
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
              className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"/>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center">
              <label htmlFor="ipassword" className="font-bold">Senha</label>
              <a href="#" className="font-light text-sm underline text-blue-500">Esqueci a senha</a>
            </div>
            <input
              type="password"
              name="password"
              id="ipassword"
              value={password}
              onChange={handlePasswordChange}
              required
              className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light"/>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <button type="submit" className="w-full bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600" >Entrar</button>
        </div>

      </form>

      <div className="flex w-[360px] h-14 p-2 justify-center items-center rounded-md border border-slate-700">
        <span className="font-bold text-sm">É um {otherUser}? <a className="hover:underline font-light text-blue-500 cursor-pointer" onClick={handleUserChange}>Entre como {otherUser}</a></span>
      </div>

      { usuarioNaoEncontrado && (
          <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300">
            Usuário não encontrado
          </span>
      ) }
    </div>
  )
}


