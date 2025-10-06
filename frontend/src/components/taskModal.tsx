import Button from "./ui/Button";
import { SquarePen } from "lucide-react";

type TaskModalProps = {
  isOpen: boolean;
  taskInfo?: { id: number; title: string; status: string; date: string };
  onClose: () => void;
};

const TaskModal = ({ isOpen, taskInfo, onClose }: TaskModalProps) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/5">
        <h2 className="text-xl font-bold mb-4 truncate">{taskInfo ? (<><span>{taskInfo.title}</span>
                                                                     <SquarePen className="inline-block ml-2" /></>) : "Nueva Tarea"}</h2> {/* Título dinámico */}

        {taskInfo ? (
          <div>
            <p><strong>Estado:</strong> {taskInfo.status}</p>
            <p><strong>Fecha:</strong> {taskInfo.date}</p>
          </div>
        ) : (
          <p className="text-gray-500">Crea una nueva tarea</p>
        )}
        <div className="mt-4 text-right">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;