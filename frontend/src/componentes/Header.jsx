import logo from "../assets/logo.png";
import { PhotoMenu } from './PhotoMenu';

export function Header({name,linkPhoto, onClickedSettings, onClickedTerms, onClickedSupport, onClickedAbout, onClickedExit }) {
    return (
        <header className="w-lvw bg-slate-900 px-10 py-4 flex justify-between items-center text-white">
            <div className='gap-3 flex justify-between items-center'>
                <img src={logo} className="size-5" />
                <span>{name}</span>
            </div>
            <div className='gap-3 flex justify-between items-center'>
                <PhotoMenu
                    linkPhoto={linkPhoto}
                    onClickedSettings={onClickedSettings}
                    onClickedTerms={onClickedTerms}
                    onClickedSupport={onClickedSupport}
                    onClickedAbout={onClickedAbout}
                    onClickedExit={onClickedExit}
                />
            </div>
        </header>
    )
}