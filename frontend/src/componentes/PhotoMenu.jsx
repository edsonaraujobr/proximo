import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon, GearIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import './PhotoMenu.css';

export function PhotoMenu({linkPhoto, onClickedSettings, onClickedTerms, onClickedSupport, onClickedAbout, onClickedExit }) {
    
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label="Customise options">
                    { linkPhoto ? (
                        <img className='IconButton cursor-pointer' src={linkPhoto} alt="foto" />
                    ) : (
                        <HamburgerMenuIcon />
                    ) }
                </button>
            </DropdownMenu.Trigger>
    
            <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent bg-slate-800 border border-slate-600" sideOffset={5}>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={onClickedSettings}>
                    Configurações <div className="RightSlot"><GearIcon/></div>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="DropdownMenuSeparator" />
    
                <DropdownMenu.Item className="DropdownMenuItem"  onClick={onClickedTerms}>
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
                    Sair <div className="RightSlot"><ExitIcon/></div>
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}