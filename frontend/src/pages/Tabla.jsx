import React, { useState } from "react";
import { CheckCircle, Circle, Clock, Plus } from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import SelectMenu from "../components/ui/SelectMenu";

// Datos iniciales de ejemplo
const tareasIniciales = [
  {
    id: 1,
    titulo: "Crear componentes iniciales de UI",
    descripcion: "Implementar componentes base con shadcn/ui para el sistema colaborativo",
    lista: "Completado",
    asignados: ["MG"],
    etiquetas: ["Frontend", "Completado"],
    fecha: null,
    estado: "verde",
  },
  {
    id: 2,
    titulo: "Implementar funcionalidad de arrastrar y soltar",
    descripcion: "Agregar react-dnd para mover tarjetas entre listas con permisos",
    lista: "En Progreso",
    asignados: ["JP", "AN"],
    etiquetas: ["Desarrollo", "Frontend"],
    fecha: null,
    estado: "amarillo",
  },
  {
    id: 3,
    titulo: "Implementar sistema de roles",
    descripcion: "Crear admin, editor, colaborador y visualizador con permisos diferenciados",
    lista: "Por Hacer",
    asignados: ["FR"],
    etiquetas: ["Desarrollo", "Backend"],
    fecha: null,
    estado: "gris",
  },
];

export default function Tabla() {
  // Estado con las tareas actuales
  const [tareas, setTareas] = useState(tareasIniciales);

  // Control del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Opciones para los selectores
  const opcionesLista = ["Por Hacer", "En Progreso", "Completado"];
  const opcionesEstado = [
    { value: "gris", label: "🔘 Por iniciar", color: "text-gray-400" },
    { value: "amarillo", label: "🟡 En progreso", color: "text-yellow-500" },
    { value: "verde", label: "✅ Completado", color: "text-green-500" }
  ];

  // Estado del formulario
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    lista: "Por Hacer",
    asignados: [],
    estado: "gris",
  });

  // Función para agregar una nueva tarea
  const handleAgregarTarea = () => {
    if (!nuevaTarea.titulo.trim()) {
      alert("Por favor ingresa un título para la tarea.");
      return;
    }

    // Generar etiquetas basadas en el estado y lista
    const etiquetas = ["Nueva"];
    if (nuevaTarea.lista === "Completado") {
      etiquetas.push("Completado");
    } else if (nuevaTarea.lista === "En Progreso") {
      etiquetas.push("Desarrollo");
    }

    const nueva = {
      id: tareas.length + 1,
      titulo: nuevaTarea.titulo,
      descripcion: nuevaTarea.descripcion,
      lista: nuevaTarea.lista,
      asignados: nuevaTarea.asignados.length > 0 ? nuevaTarea.asignados : ["--"],
      etiquetas: etiquetas,
      fecha: null,
      estado: nuevaTarea.estado,
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea({ 
      titulo: "", 
      descripcion: "", 
      lista: "Por Hacer", 
      asignados: [], 
      estado: "gris" 
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg mx-2 my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Vista de Tabla</h2>

        {/* 🔘 Botón agregar tarea */}
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Agregar tarea
        </Button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-sm font-semibold text-gray-700">Título</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Lista</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Asignados</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Etiquetas</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Fecha límite</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-start gap-2">
                    {tarea.estado === "verde" && <CheckCircle className="text-green-500 w-5 h-5 mt-1" />}
                    {tarea.estado === "amarillo" && <Clock className="text-yellow-500 w-5 h-5 mt-1" />}
                    {tarea.estado === "gris" && <Circle className="text-gray-400 w-5 h-5 mt-1" />}
                    <div>
                      <p className="font-semibold">{tarea.titulo}</p>
                      <p className="text-xs text-gray-500">{tarea.descripcion}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-sm">{tarea.lista}</td>
                <td className="p-3 text-sm">
                  <div className="flex -space-x-2">
                    {tarea.asignados.map((a, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full border text-xs font-bold"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2 flex-wrap">
                    {tarea.etiquetas.map((etiqueta, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 border"
                      >
                        {etiqueta}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-sm">
                  <span className="text-gray-400">Sin fecha</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de nueva tarea */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nueva Tarea"
      >
        <div className="space-y-4">
          <Input
            label="Título"
            placeholder="Ej: Diseñar la vista de login"
            value={nuevaTarea.titulo}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
          />
          
          <Input
            label="Descripción"
            placeholder="Detalles de la tarea..."
            value={nuevaTarea.descripcion}
            onChange={(e) =>
              setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
            }
          />

          <SelectMenu
            label="Lista"
            options={opcionesLista}
            defaultValue={nuevaTarea.lista}
            onSelect={(value) => setNuevaTarea({ ...nuevaTarea, lista: value })}
          />

          <div>
            <Input
              label="Asignados"
              placeholder="Iniciales separadas por comas (ej: MG, JP)"
              value={nuevaTarea.asignados.join(", ")}
              onChange={(e) =>
                setNuevaTarea({ 
                  ...nuevaTarea, 
                  asignados: e.target.value.split(",").map(s => s.trim()).filter(s => s) 
                })
              }
            />
            {nuevaTarea.asignados.length > 0 && (
              <div className="mt-2 flex gap-2">
                <span className="text-sm text-gray-600">Vista previa:</span>
                {nuevaTarea.asignados.map((asignado, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full border text-xs font-bold"
                  >
                    {asignado}
                  </div>
                ))}
              </div>
            )}
          </div>

          <SelectMenu
            label="Estado de la tarea"
            options={opcionesEstado.map(opcion => opcion.label)}
            defaultValue={opcionesEstado.find(op => op.value === nuevaTarea.estado)?.label}
            onSelect={(label) => {
              const estado = opcionesEstado.find(op => op.label === label)?.value || "gris";
              setNuevaTarea({ ...nuevaTarea, estado });
            }}
          />

          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAgregarTarea}>
              Guardar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
