import { useState } from "react";

export function LoginAdministrador({ typeUser, otherUser, onButtonChangeUser}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Processar dados de resposta, redirecionar ou mostrar mensagem de sucesso, etc.
            console.log('Usuário autenticado:', data);
        } else {
            console.error('Erro ao autenticar usuário:', response.statusText);
            // Mostrar mensagem de erro adequada ao usuário
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
        // Tratar erros de conexão com o servidor
    }
  };

  return (
    <div className='w-lvw h-lvh bg-gradient-to-t from-slate-800 to-slate-900 text-white flex gap-4 flex-col justify-center items-center'>
      <div>
        <h2 className="font-light text-2xl">
          Entre como <strong className="font-bold">{typeUser}</strong>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className=" w-[360px] h-52 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-transparent gap-4 rounded-lg p-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="imain" className="font-bold">Nome de {typeUser} ou email</label>
          <input 
            autoComplete="email" 
            type="text"
            name="main"
            id="imain" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light"/>
        </div>

        <div className="flex w-full">
          <button type="submit" className="w-full bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600" >Entrar</button>
        </div>
      </form>

      <div className="flex w-[360px] h-14 p-2 justify-center items-center rounded-md border border-slate-700">
        <span className="font-bold text-sm">É um {otherUser}? <a href="#" className="hover:underline font-light text-blue-500" onClick={onButtonChangeUser}>Entre como {otherUser}</a></span>
      </div>
    </div>
  )
}


