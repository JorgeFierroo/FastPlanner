import React from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";

// Datos de ejemplo
const tareas = [
  {
    id: 1,
    titulo: "Crear componentes iniciales de UI",
    descripcion:
      "Implementar componentes base con shadcn/ui para el sistema colaborativo",
    lista: "Completado",
    asignados: ["MG"],
    etiquetas: ["Frontend", "Completado"],
    fecha: null,
    estado: "verde",
  },
  {
    id: 2,
    titulo: "Implementar funcionalidad de arrastrar y soltar",
    descripcion:
      "Agregar react-dnd para mover tarjetas entre listas con permisos",
    lista: "En Progreso",
    asignados: ["JP", "AN"],
    etiquetas: ["Desarrollo", "Frontend"],
    fecha: null,
    estado: "amarillo",
  },
  {
    id: 3,
    titulo: "Implementar sistema de roles",
    descripcion:
      "Crear admin, editor, colaborador y visualizador con permisos diferenciados",
    lista: "Por Hacer",
    asignados: ["FR"],
    etiquetas: ["Desarrollo", "Backend"],
    fecha: null,
    estado: "gris",
  },
  {
    id: 4,
    titulo: "Planificar estructura del proyecto",
    descripcion:
      "Definir la arquitectura general y componentes del sistema colaborativo",
    lista: "Por Hacer",
    asignados: ["MG"],
    etiquetas: ["Planificación", "Alta Prioridad"],
    fecha: "29 Dec 2024",
    estado: "rojo",
  },
];

export default function TablaKanban() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Vista de Tabla</h2>

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
                    {tarea.estado === "verde" && (
                      <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
                    )}
                    {tarea.estado === "amarillo" && (
                      <Clock className="text-yellow-500 w-5 h-5 mt-1" />
                    )}
                    {tarea.estado === "gris" && (
                      <Circle className="text-gray-400 w-5 h-5 mt-1" />
                    )}
                    {tarea.estado === "rojo" && (
                      <Circle className="text-red-500 w-5 h-5 mt-1" />
                    )}
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
                  {tarea.fecha ? (
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        tarea.estado === "rojo"
                          ? "bg-red-100 text-red-600 font-bold"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tarea.fecha}
                      {tarea.estado === "rojo" && " (Vencida)"}
                    </span>
                  ) : (
                    <span className="text-gray-400">Sin fecha</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
