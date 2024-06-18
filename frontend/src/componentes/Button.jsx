import React from 'react';

export function Button({ color, text, icon, size, hover, onButtonClicked }) {
    return (
        <button
            onClick={onButtonClicked}
            type="button"
            className={`${color} rounded-md flex justify-center items-center gap-1 p-1 text-sm w-${size} ${hover && `hover:${hover}`}`}
        >
            {icon}
            {text}
        </button>
    );
}