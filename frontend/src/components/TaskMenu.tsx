import { useState } from "react";
import { Edit2, Trash2, MoreVertical } from "lucide-react";

type Props = {
    onDelete: ()=> void;
    onEdit: ()=> void;
};

function TaskMenu({onDelete, onEdit}: Props){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative inline-block text-left">
            <button onClick={()=> setIsOpen(!isOpen)} className="p-2 my-2 rounded-md hover:bg-gray-100 transition-all duration-200">
                 <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    <button onClick={()=> {onEdit(); setIsOpen(false);}} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all rounded-t-xl">
                        <Edit2 className="w-4 h-4"/>Editar
                    </button>
                    <button onClick={()=> {onDelete(); setIsOpen(false);}} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all rounded-b-xl">
                        <Trash2 className="w-4 h-4"/>Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskMenu;