import React, { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";
import { SquarePen, Crown, Plus, Check, X } from "lucide-react";
import { StatusColors } from "./StatusColors";

type TaskModalProps = {
  isOpen: boolean;
  taskInfo?: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string };
  onClose: () => void;
};

const TaskModal = ({ isOpen, taskInfo, onClose }: TaskModalProps) => {
    const [editingFields, setEditingFields] = useState({
        title: false,
        description: false,
        status: false,
        priority: false,
        date: false
    });

    const [taskData, setTaskData] = useState(taskInfo || {
        id: 0,
        title: "Nueva Tarea",
        description: "Sin descripción",
        creador: "Desconocido",
        status: "Pendiente",
        prioridad: "Media",
        date: new Date().toISOString().split("T")[0]
    });

    const [isTaskEdited, setIsTaskEdited] = useState(false);

    // Actualiza taskData y el estado de editado cuando taskInfo cambia
    useEffect(() => {
        if (taskInfo) {
            setTaskData(taskInfo);
            setIsTaskEdited(false);
        }
    }, [taskInfo]);

    // Refs para capturar valores de entrada
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const toggleEditing = (field: keyof typeof editingFields) => {
        setEditingFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const saveField = (field: keyof typeof editingFields) => {
        let newValue = "";
        
        switch (field) {
            case 'title':
                newValue = titleRef.current?.value || "";
                break;
            case 'description':
                newValue = descriptionRef.current?.value || "";
                break;
            case 'status':
                newValue = statusRef.current?.value || "";
                break;
            case 'priority':
                newValue = priorityRef.current?.value || "";
                break;
            case 'date':
                newValue = dateRef.current?.value || "";
                break;
        }

        setTaskData(prev => ({
            ...prev,
            [field === 'priority' ? 'prioridad' : field]: newValue  // ajuste pq en taskData y taskInfo es 'prioridad' no 'priority'
        }));

        setIsTaskEdited(true);
        toggleEditing(field);
    };

    const cancelEdit = (field: keyof typeof editingFields) => {
        toggleEditing(field);
    };

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/5">

        {taskInfo ? (
          <div className="flex">
            <div className="w-3/4">
            <h2 className="text-xl font-bold mb-4 whitespace-normal break-words flex items-center">
              {editingFields.title ? (
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    ref={titleRef}
                    type="text" 
                    defaultValue={taskData.title}
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    autoFocus
                  />
                  <Check 
                    className="cursor-pointer hover:text-green-600 text-green-500" 
                    size={20}
                    onClick={() => saveField('title')}
                  />
                  <X 
                    className="cursor-pointer hover:text-red-600 text-red-500" 
                    size={20}
                    onClick={() => cancelEdit('title')}
                  />
                </div>
              ) : (
                <span className="flex-1 overflow-hidden text-ellipsis">{taskData.title}</span>
              )}
              {!editingFields.title && (
                <SquarePen 
                  className="inline-block ml-2 cursor-pointer hover:text-blue-600" 
                  size={20}
                  onClick={() => toggleEditing('title')}
                />
              )}
            </h2>
              <p className="mb-2">Tarea creada por: <span className="font-semibold">{taskData.creador}</span></p>
              
              <div className="mb-4">
                <label className="block font-semibold flex items-center">
                  Descripción:
                  {!editingFields.description && (
                    <SquarePen 
                      className="ml-2 cursor-pointer hover:text-blue-600" 
                      size={16}
                      onClick={() => toggleEditing('description')}
                    />
                  )}
                </label>
                {editingFields.description ? (
                  <div className="mt-1">
                    <textarea 
                      ref={descriptionRef}
                      defaultValue={taskData.description}
                      className="w-full border border-gray-300 rounded-md p-2" 
                      autoFocus
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <Check 
                        className="cursor-pointer hover:text-green-600 text-green-500" 
                        size={20}
                        onClick={() => saveField('description')}
                      />
                      <X 
                        className="cursor-pointer hover:text-red-600 text-red-500" 
                        size={20}
                        onClick={() => cancelEdit('description')}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md border">{taskData.description || "Sin descripción"}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-semibold flex items-center">
                  Estado:
                  {!editingFields.status && (
                    <SquarePen 
                      className="ml-2 cursor-pointer hover:text-blue-600" 
                      size={16}
                      onClick={() => toggleEditing('status')}
                    />
                  )}
                </label>
                {editingFields.status ? (
                  <div className="mt-1">
                    <select 
                      ref={statusRef}
                      defaultValue={taskData.status}
                      className="w-full border border-gray-300 rounded-md p-2"
                      autoFocus
                    >
                      {StatusColors.map((status) => (
                        <option key={status.label} value={status.label}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                      <Check 
                        className="cursor-pointer hover:text-green-600 text-green-500" 
                        size={20}
                        onClick={() => saveField('status')}
                      />
                      <X 
                        className="cursor-pointer hover:text-red-600 text-red-500" 
                        size={20}
                        onClick={() => cancelEdit('status')}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md border">{taskData.status}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-semibold flex items-center">
                  Prioridad:
                  {!editingFields.priority && (
                    <SquarePen 
                      className="ml-2 cursor-pointer hover:text-blue-600" 
                      size={16}
                      onClick={() => toggleEditing('priority')}
                    />
                  )}
                </label>
                {editingFields.priority ? (
                  <div className="mt-1">
                    <select 
                      ref={priorityRef}
                      defaultValue={taskData.prioridad}
                      className="w-full border border-gray-300 rounded-md p-2"
                      autoFocus
                    >
                      {["alta", "media", "baja"].map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                      <Check 
                        className="cursor-pointer hover:text-green-600 text-green-500" 
                        size={20}
                        onClick={() => saveField('priority')}
                      />
                      <X 
                        className="cursor-pointer hover:text-red-600 text-red-500" 
                        size={20}
                        onClick={() => cancelEdit('priority')}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md border">{taskData.prioridad}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-semibold flex items-center">
                  Fecha:
                  <SquarePen 
                    className="ml-2 cursor-pointer hover:text-blue-600" 
                    size={16}
                    onClick={() => toggleEditing('date')}
                  />
                </label>
                {editingFields.date ? (
                  <div className="mt-1">
                    <input 
                      ref={dateRef}
                      type="date" 
                      defaultValue={taskData.date}
                      className="w-full border border-gray-300 rounded-md p-2" 
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2">
                      <Check 
                        className="cursor-pointer hover:text-green-600 text-green-500" 
                        size={20}
                        onClick={() => saveField('date')}
                      />
                      <X 
                        className="cursor-pointer hover:text-red-600 text-red-500" 
                        size={20}
                        onClick={() => cancelEdit('date')}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md border">{taskData.date || "Sin fecha"}</p>
                )}
              </div>
            </div>
            <div className="w-1/4 ml-4 flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-center">Colaboradores</h3>
              <div className="border-2 rounded-md border-gray-300 bg-gray-50 p-2 h-full overflow-y-auto">
                <div className="mb-2 p-2 bg-white rounded-md shadow-sm hover:cursor-pointer hover:bg-gray-100 flex justify-between items-center">
                  <span className="font-semibold">{taskInfo.creador}</span>
                  <Crown className="text-yellow-500" />
                </div>
                <div className="rounded-pill p-2 bg-white rounded-md shadow-sm hover:cursor-pointer hover:bg-gray-100 flex justify-between items-center">
                  <span className="font-semibold text-gray-500">Agregar</span>
                  <Plus className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Crea una nueva tarea</p>
        )}
        <div className="mt-4 gap-4 text-right">
          <Button disabled={!isTaskEdited} className="mr-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed" >Guardar Cambios</Button>
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;