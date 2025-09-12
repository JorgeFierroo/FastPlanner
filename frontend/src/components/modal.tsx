import { on } from "events";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function Modal({isOpen, onClose, children}: Props){
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg relative w-96">
                <button onClick={onClose} className="absolute top-1 text-gray-500 hover:text-black bg-red-200 px-2 hover:bg-red-300 rounded"> X </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;