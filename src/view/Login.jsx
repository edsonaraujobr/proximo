

export default function Login() {

  return (
    <div className='w-lvw h-lvh bg-gradient-to-t from-slate-800 to-slate-900 text-white flex gap-4 flex-col justify-center items-center'>
      <div>
        <h2 className="font-bold">
          Entre como atendente
        </h2>
      </div>

      <div className=" w-[360px] h-64 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-transparent gap-4 rounded-lg p-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="imain" className="font-bold">Nome de usuário ou email</label>
          <input autoComplete="email" type="text" name="main" id="imain" className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2  h-7 font-light"/>
        </div>

        <div className="flex flex-col gap-1 w-full">

          <div className="flex justify-between items-center">
            <label htmlFor="ipassword" className="font-bold">Senha</label>
            <a href="#" className="font-light text-sm underline text-blue-500">Esqueci a senha</a>
          </div>
          <input type="password" name="password" id="ipassword"  className="rounded-md bg-slate-800 outline-none focus:ring-1 focus:ring-lime-400 p-2 h-7 font-light"/>
        </div>

        <div className="flex w-full">
          <button type="button" className="w-full bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600">Entrar</button>
        </div>
      </div>

      <div className="flex w-[360px] h-14 p-2 justify-center items-center rounded-md border border-slate-700">
        <span className="font-bold text-sm">É um administrador? <a href="#" className="hover:underline font-light text-blue-500">Entre como administrador</a></span>
      </div>
    </div>
  )
}


