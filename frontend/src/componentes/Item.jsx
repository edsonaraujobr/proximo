
export function Item({countItem, handleRemoveItem, handleAddItem, nameItem, colorButton, hoverColorButton, disabled}) {
    return (
        <div className='relative'>
            { countItem !== 0 ?  (
                <div className='flex'>
                    <div className='absolute left-20 bottom-3 w-5 h-5 text-white bg-green-700 rounded-full flex items-center justify-center'>
                        {countItem}
                    </div>
                    <button onClick={handleRemoveItem} type="button" className='absolute right-20 bottom-3 w-5 h-5 text-white bg-red-700 hover:bg-red-800 rounded-full flex items-center justify-center'>
                        x
                    </button>

                </div>
            ) : null}   
            <button 
                disabled={disabled}
                className={`${colorButton} w-24 rounded-md hover:${hoverColorButton}`}
                type="button"
                onClick={handleAddItem}
            >
                {nameItem}
            </button>

        </div>
    )
}