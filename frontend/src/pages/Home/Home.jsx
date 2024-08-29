import {Link} from "react-router-dom"
import logo from "../../assets/logo.png";

export function Home() {
    
    return (
        <div className="min-h-screen bg-slate-800 text-white">
            <header className="fixed top-0 left-0 w-full  bg-gradient-to-r from-slate-700 to-slate-800 px-10 py-4 flex justify-between items-center z-10">
                <div className="flex gap-4 items-center">
                    <img src={logo} className="logo" alt="Logo" />
                </div>
                <nav className="flex gap-3 text-lime-500">
                    <a href="#home" className="hover:text-white">Início</a>
                    <a href="#features" className="hover:text-white">Funcionalidades</a>
                    <a href="#benefits" className="hover:text-white">Benefícios</a>
                    <a href="#about" className="hover:text-white">Sobre</a>
                    <a href="#contact" className="hover:text-white">Contato</a>
                </nav>
            </header>
            <main className="pt-24">
                {/* Hero Section */}
                <section id="home" className="px-10 py-24 bg-gradient-to-r from-slate-700 to-slate-800 flex justify-center items-center gap-20 ">
                    <div className="flex flex-col gap-4 ">
                        <h1 className="text-5xl font-bold text-lime-500">Bem-vindo ao Próximo</h1>
                        <p className="text-lg font-light ">Esta é uma aplicação completa para realizar a <strong className="font-bold">administração das vendas </strong><br /> do restaurante universitário de forma <strong className="font-bold">simplificada e completamente digital.</strong></p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Link to="/clerk" className="w-full  text-center px-4 py-2 bg-lime-500 rounded text-slate-900 hover:bg-lime-600 hover:scale-110 duration-300 transition ease-in-out delay-150">Entrar como Atendente</Link>
                        <Link to="/administrator" className="w-full text-center  px-4 py-2 bg-lime-500 rounded text-slate-900 hover:bg-lime-600 hover:scale-110 duration-300 transition ease-in-out delay-150">Entrar como Administrador</Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="px-10 py-10 bg-slate-800">
                    <h2 className="text-4xl font-bold mb-8 text-center text-lime-500">Funcionalidades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150 bg-gradient-to-t from-slate-700 to-slate-800 p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                <img src="../../../public/interface.jpeg" alt="atendimento" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Gestão de Pedidos</h3>
                            <p className="text-lg text-center">Na Próximo há agilidade para realização do pedido.</p>
                        </div>
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150 bg-gradient-to-t from-slate-700 to-slate-800 p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                <img src="../../../public/financeiro.jpeg" alt="controle financeiro" className="size-[410px]"/>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Controle financeiro</h3>
                            <p className="text-lg text-center">Na Próximo as formas de pagamento ficam salvas para organização da empresa.</p>
                        </div>
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150 bg-gradient-to-t from-slate-700 to-slate-800 p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                 <img src="../../../public/relatorio.jpeg" alt="relatorio" className="scale-100"/>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Criação de relatórios</h3>
                            <p className="text-lg text-center">Na Próximo os relatórios são criados com facilidade.</p>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="px-10 py-10 bg-gradient-to-r from-slate-700 to-slate-800">
                    <h2 className="text-4xl font-bold mb-8 text-center text-lime-500">Benefícios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150 bg-transparent border border-white text-white p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                <img src="../../../public/eficiencia.jpeg" alt="eficiencia" className="scale-125"  />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Eficiência Operacional</h3>
                            <p className="text-lg text-center">
                                Tarefas rápidas através de teclas de atalho.
                            </p>
                        </div>
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150  bg-transparent border border-white text-white p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                <img src="../../../public/cliente.jpeg" alt="cliente" className="scale-100"  />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Experiência do Usuário</h3>
                            <p className="text-lg text-center">Experiência melhorada pela agilidade em otimizar o atendimento.</p>
                        </div>
                        <div className="hover:scale-110 duration-300 transition ease-in-out delay-150 bg-transparent border border-white text-white p-6 rounded text-center">
                            <div className="h-48 bg-slate-700 mb-4 flex justify-center items-center overflow-hidden">
                                <img src="../../../public/usabilidade.jpeg" alt="usabilidade" className="scale-100"  />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Usabilidade</h3>
                            <p className="text-lg text-center">Facilidade para os atendentes e administradores utilizarem o sistema.</p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="px-10 py-10 text-center">
                    <h2 className="text-4xl font-bold mb-8 text-lime-500">Sobre Nós</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                        <img src="../../../public/logo.png" alt="foto cliente"  className="size-32"/>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg">
                                <strong>Próximo</strong> é uma aplicação inovadora projetada para transformar a maneira como o restaurante universitário é gerenciado, tornando o processo mais eficiente, organizado e acessível tanto para os estudantes quanto para o público externo. 
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="px-10 py-10 bg-gradient-to-r from-slate-700 to-slate-800 text-center">
                    <h2 className="text-4xl font-bold mb-8 text-lime-500">Contato</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <form className="w-full md:w-1/2 p-6 rounded flex flex-col bg-transparent  ">
                            <div className="mb-4">
                                <label className="block text-left mb-2" htmlFor="name">Nome:</label>
                                <input className="w-full px-4 py-2 bg-slate-800 text-white rounded outline-none" type="text" id="name" name="name" placeholder="Seu nome" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-left mb-2" htmlFor="email">Email:</label>
                                <input className="w-full px-4 py-2 bg-slate-800 text-white rounded outline-none" type="email" id="email" name="email" placeholder="Seu email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-left mb-2" htmlFor="message">Mensagem:</label>
                                <textarea className="resize-none  w-full px-4 py-2 bg-slate-800 text-white rounded outline-none" id="message" name="message" placeholder="Sua mensagem" rows="4"></textarea>
                            </div>
                            <button className="px-4 py-2 bg-lime-500 rounded text-slate-900 hover:bg-lime-600">Enviar</button>
                        </form>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg mb-4">Entre em contato conosco para saber mais sobre <br /> o Próximo e como podemos ajudar a melhorar a gestão do seu restaurante.</p>
                            <p className="text-lg"><strong>Email: </strong> proximo@gmail.com</p>
                            <p className="text-lg"><strong>Telefone:</strong> (99) 9999-9999</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full bg-gradient-to-r from-slate-700 to-slate-800 py-4 text-center mt-24">
                <p className="text-sm text-center text-white">&copy; 2024 - Próximo. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}