import Button from "./ui/Button";
import { SquarePen, Crown } from "lucide-react";
import { StatusColors } from "./StatusColors";

type TaskModalProps = {
  isOpen: boolean;
  taskInfo?: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string };
  onClose: () => void;
};

const TaskModal = ({ isOpen, taskInfo, onClose }: TaskModalProps) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/5">

        {taskInfo ? (
          <div className="flex">
            <div className="w-3/4">
            <h2 className="text-xl font-bold mb-4 whitespace-normal break-words">{taskInfo ? (<><span>{taskInfo.title}</span>
            <SquarePen className="inline-block ml-2" /></>) : "Nueva Tarea"}</h2>
              <p className="mb-2">Tarea creada por: <span className="font-semibold">{taskInfo.creador}</span></p>
              <form action="post">
                <label htmlFor="textarea_descripcion" className="block font-semibold">Descripción:</label>
                <textarea id="textarea_descripcion" name="textarea_descripcion" defaultValue={taskInfo.description}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2" />
              </form>
              <form action="post">
               <label htmlFor="select_estado" className="block font-semibold">Estado:</label>
               <select id="select_estado" name="select_estado" defaultValue={taskInfo.status}
                 className="mt-1 w-full border border-gray-300 rounded-md p-2">
                {StatusColors.map((status) => (
                  <option key={status.label} value={status.label}>
                    {status.label}
                  </option>
                  ))}
               </select>
              </form>
              <form action="post">
                <label htmlFor="select_prioridad" className="block font-semibold mt-4">Prioridad:</label>
                <select id="select_prioridad" name="select_prioridad" defaultValue={taskInfo.prioridad}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2">
                  {["alta", "media", "baja"].map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </form>
              <form action="post">
                <label htmlFor="input_fecha" className="block font-semibold mt-4">Fecha:</label>
                <input type="date" id="input_fecha" name="input_fecha" defaultValue={taskInfo.date}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2" />
              </form>
            </div>
            <div className="w-1/4 ml-4 flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-center">Colaboradores</h3>
              <div className="border-2 rounded-md border-gray-300 bg-gray-50 p-2 h-full overflow-y-auto">
                <div className="mb-2 p-2 bg-white rounded-md shadow-sm hover:cursor-pointer hover:bg-gray-100 flex justify-between items-center">
                  <span className="font-semibold">{taskInfo.creador}</span>
                  <Crown className="text-yellow-500" />
                </div>
              </div>
            </div>
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