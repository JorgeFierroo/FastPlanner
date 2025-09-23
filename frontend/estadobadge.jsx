import React from "react";
import { CheckCircle, Clock, Circle, AlertCircle } from "lucide-react";

export default function EstadoBadge({ estado }) {
  // Normaliza estado en minúscula
  const estadoNorm = estado?.toLowerCase() || "por hacer";

  const estilos = {
    completado: {
      bg: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      texto: "Completado",
    },
    "en progreso": {
      bg: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="w-4 h-4 mr-1" />,
      texto: "En Progreso",
    },
    "por hacer": {
      bg: "bg-gray-100 text-gray-600",
      icon: <Circle className="w-4 h-4 mr-1" />,
      texto: "Por Hacer",
    },
    vencida: {
      bg: "bg-red-100 text-red-700 font-bold",
      icon: <AlertCircle className="w-4 h-4 mr-1" />,
      texto: "Vencida",
    },
  };

  const { bg, icon, texto } =
    estilos[estadoNorm] || estilos["por hacer"];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${bg}`}
    >
      {icon}
      {texto}
    </span>
  );
}
