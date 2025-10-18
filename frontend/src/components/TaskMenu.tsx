import { useState } from "react";

type Props = {
    onDelete: ()=> void;
    onEdit: ()=> void;
};

function TaskMenu({onDelete, onEdit}: Props){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative inline-block text-left">
            <button onClick={()=> setIsOpen(!isOpen)} className="p-2 rounded hover:bg-gray-200">
                 ⁝
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <button onClick={()=> {onEdit(); setIsOpen(false);}} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Editar
                    </button>
                    <button onClick={()=> {onDelete(); setIsOpen(false);}} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskMenu;