import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
// Datos simulados de proyectos
const proyectos = [
  {
    id: 1,
    nombre: "Diseño de Aplicación Móvil",
    descripcion: "Proyecto reciente enfocado en diseño UI/UX.",
    estado: "En progreso",
    color: "bg-yellow-400",
    imagen: "https://picsum.photos/600/300?random=1"
  },
  {
    id: 2,
    nombre: "Panel de Control Web",
    descripcion: "Dashboard para monitorear métricas empresariales.",
    estado: "Completado",
    color: "bg-green-500",
    imagen: "https://picsum.photos/600/300?random=2"
  },
  {
    id: 3,
    nombre: "Sistema de Gestión de Tareas",
    descripcion: "Aplicación para organizar y priorizar tareas.",
    estado: "Pendiente",
    color: "bg-red-400",
    imagen: "https://picsum.photos/600/300?random=3"
  }
];

// --- Página principal: lista de proyectos ---
function PaginaProyectos() {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Proyectos</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Crear Nuevo Proyecto
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Todos los Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proyectos.map((proyecto) => (
            <div
              key={proyecto.id}
              onClick={() => navigate(`/vistas/${proyecto.id}`)}
              className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{proyecto.nombre}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {proyecto.descripcion}
                </p>

                {/* Indicador visual de estado */}
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${proyecto.color}`}
                  ></span>
                  <span className="text-sm text-gray-700 font-medium">
                    {proyecto.estado}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- Página de vistas de un proyecto ---
function PaginaVistas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proyecto = proyectos.find((p) => p.id === parseInt(id));

  if (!proyecto) {
    return (
      <div className="p-10">
        <h2 className="text-red-500 text-xl mb-4">Proyecto no encontrado</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Volver a proyectos
      </button>

      <h1 className="text-3xl font-bold mb-4">{proyecto.nombre}</h1>
      <div className="flex items-center mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${proyecto.color}`}
        ></span>
        <span className="text-gray-700 font-medium">{proyecto.estado}</span>
      </div>

      <img
        src={proyecto.imagen}
        alt={proyecto.nombre}
        className="w-full rounded-lg shadow mb-6"
      />
      <p className="text-gray-700 mb-8">{proyecto.descripcion}</p>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Vistas del Proyecto</h2>
        <p className="text-gray-600">
          Aquí podrás visualizar los diferentes módulos, componentes o avances
          del proyecto seleccionado. Puedes agregar indicadores de progreso o
          estadísticas de trabajo en esta sección.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <EditProfile user={{ name: "Juan", email: "juan@example.com" }} />
    </NotificationProvider>
  );
}

// --- Aplicación principal con rutas ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaProyectos />} />
        <Route path="/vistas/:id" element={<PaginaVistas />} />
      </Routes>
    </Router>
  );
}
