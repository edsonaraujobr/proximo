import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon, GearIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import './PhotoMenu.css';
import Modal from '../componentes/Modal.jsx'

export function PhotoMenu({linkPhoto, onClickedSettings, onClickedTerms, onClickedSupport, onClickedAbout, onClickedExit }) {
    
    const [openModalTerms, setOpenModalTerms]=useState(false);
    const customModalStyles = {
        width: '40%',
        height: '90%',
        position: 'fixed',
        top:'50%',
        left:'50%',
        padding:'30px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
      };
    console.log(linkPhoto)
    return (
        <><DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label="Customise options">
                    {linkPhoto !== 'http://localhost:3030/uploads/null' && typeof linkPhoto !== 'undefined' ? (
                        <img className='IconButton cursor-pointer' src={linkPhoto} alt="foto" />
                    ) : (
                        <HamburgerMenuIcon />
                    )}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent bg-slate-800 border border-slate-600" sideOffset={5}>
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={onClickedSettings}>
                        Configurações <div className="RightSlot"><GearIcon /></div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                    <DropdownMenu.Item className="DropdownMenuItem" onClick={() => setOpenModalTerms(true)}>
                        Termos de uso
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={onClickedSupport}>
                        Suporte
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={onClickedAbout}>
                        Sobre o Próximo
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                    <DropdownMenu.Item className="DropdownMenuItem" onClick={onClickedExit}>
                        Sair <div className="RightSlot"><ExitIcon /></div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
        
        <Modal isOpen={openModalTerms} customStyles={customModalStyles}
        >        
        <h1 className="text-2xl font-bold text-lime-500 mb-4">Termos de Uso do Sistema do Restaurante Universitário (RU)</h1>

        <section className="mb-6 mt-6">
         
            <p >
                Bem-vindo ao Sistema do Restaurante Universitário (RU). 
                Por favor, leia atentamente os termos de uso antes de utilizar nosso sistema.
                Ao utilizar este serviço, você concorda com os seguintes termos: 
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold text-lime-500 border-b-2 border-lime-text-lime-500 pb-1 mb-2">1. Requisitos e Responsabilidades</h2>
            <h3 className="text-lg font-semibold text-lime-500 mt-4">1.1. Para Atendentes</h3>
                    <p><strong>Uso Adequado:</strong> Atendentes devem usar o sistema exclusivamente para realizar o registro de refeições, cobranças 
                    e impressão de relatórios conforme suas responsabilidades.</p>
                    <p><strong>Confirmação de Dados:</strong> Atendentes devem garantir que a matrícula do usuário seja verificada corretamente e que
                     o tipo de usuário (PRAE, 50% ou Externo) seja registrado de acordo com as regras estabelecidas.</p>
                    <p><strong>Manuseio de Pagamentos:</strong> Atendentes são responsáveis por inserir o valor correto no sistema, calcular e fornecer 
                    troco quando necessário.</p>
                    <p><strong>Relatórios:</strong> Atendentes devem gerar e revisar relatórios de fim de turno conforme necessário para a administração do RU.</p>
                    <p><strong>Segurança:</strong> Atendentes devem manter a confidencialidade das informações dos usuários e seguir as práticas de segurança estabelecidas.</p>
                
            <h3 className="text-lg font-semibold text-lime-500 mt-4">1.2. Para Administradores</h3>
                    <p><strong>Gestão de Usuários:</strong> Administradores são responsáveis por registrar novos usuários do PRAE e 50%, e remover usuários desatualizados do banco de dados.</p>
                    <p><strong>Gestão de Atendentes:</strong> Administradores devem gerenciar o cadastro e remoção de atendentes no sistema.</p>
                    <p><strong>Manutenção:</strong> Administradores são responsáveis pela manutenção do sistema e devem garantir que o sistema esteja funcionando de maneira estável e eficiente.</p>
                    <p><strong>Segurança:</strong> Administradores devem assegurar que todas as informações pessoais e dados dos usuários sejam protegidos de acordo com a legislação aplicável.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold text-lime-500 border-b-2 border-lime-text-lime-500 pb-1 mb-2">2. Direitos de Propriedade Intelectual</h2>
            <p>O sistema, incluindo seu design, software, e quaisquer outros componentes, é propriedade intelectual da PRÓXIMO e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold text-lime-500 border-b-2 border-lime-text-lime-500 pb-1 mb-2">3. Proibições</h2>
            
                <p><strong>Uso Indevido:</strong> É proibido usar o sistema para qualquer finalidade não autorizada, incluindo manipulação de dados, fraude, ou qualquer atividade ilegal.</p>
                <p><strong>Compartilhamento de Acesso:</strong> Atendentes e administradores não devem compartilhar suas credenciais de acesso com terceiros.</p>
            
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold text-lime-500 border-b-2 border-lime-text-lime-500 pb-1 mb-2">4. Modificações dos Termos de Uso</h2>
            <p>A PRÓXIMO se reserva o direito de modificar estes Termos de Uso a qualquer momento. Quaisquer mudanças serão publicadas no sistema e/ou comunicadas aos usuários.</p>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-semibold text-lime-500 border-b-2 border-lime-text-lime-500 pb-1 mb-2">5. Contato</h2>
            <p>Para dúvidas ou questões sobre estes Termos de Uso, entre em contato com proximoru@gmail.com</p>
            
        </section>

        <footer className="bg-lime-text-lime-500 text-white py-4 rounded-b-lg text-center">
            <p>&copy; 2024 PRÓXIMO. Todos os direitos reservados.</p>
        </footer>
 
            <button type="" className="w-20 bg-lime-700 text-white rounded-md h-7 hover:bg-lime-600 " onClick={() => setOpenModalTerms(false)}>Fechar</button>

        </Modal></>       
        
    )
}