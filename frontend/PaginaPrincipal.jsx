import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  LayoutDashboard,
  Table2,
  Calendar,
  PlusCircle,
  Clock,
  FilePlus,
  Layers,
} from "lucide-react";

export default function Inicio() {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const tecnologias = [
    { nombre: "React.js", rol: "Interfaz dinámica", color: "bg-blue-100" },
    { nombre: "TailwindCSS", rol: "Diseño responsivo", color: "bg-cyan-100" },
    { nombre: "FastAPI", rol: "API backend", color: "bg-green-100" },
    { nombre: "SQLite", rol: "Base de datos ligera", color: "bg-yellow-100" },
    { nombre: "Lucide React", rol: "Sistema de iconos", color: "bg-pink-100" },
    { nombre: "React DnD", rol: "Gestión de drag & drop", color: "bg-purple-100" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Panel de Inicio — Sistema Kanban
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Organiza tus proyectos y tareas de forma visual, intuitiva y colaborativa.
            Este sistema combina <span className="font-semibold">React</span> con{" "}
            <span className="font-semibold">FastAPI</span> para lograr eficiencia,
            escalabilidad y una interfaz moderna.
          </p>
        </div>

        {/* Acciones rápidas */}
        <section className="grid md:grid-cols-2 gap-6 mb-14">
          {/* Crear nuevo proyecto */}
          <div
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
            className="cursor-pointer flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition"
          >
            <PlusCircle className="w-10 h-10 text-indigo-600 mb-2" />
            <h2 className="font-bold text-lg">Crear Nuevo Proyecto</h2>
            <p className="text-gray-500 text-sm">
              Selecciona una plantilla o empieza desde cero
            </p>

            {/* Opciones desplegables */}
            {mostrarOpciones && (
              <div className="mt-4 space-y-2">
                <Button className="flex gap-2 items-center w-full justify-center">
                  <FilePlus className="w-4 h-4" />
                  Proyecto en Blanco
                </Button>
                <Button variant="outline" className="flex gap-2 items-center w-full justify-center">
                  <Layers className="w-4 h-4" />
                  Usar Plantilla
                </Button>
              </div>
            )}
          </div>

          {/* Proyecto reciente */}
          <div className="flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
            <Clock className="w-10 h-10 text-gray-600 mb-2" />
            <h2 className="font-bold text-lg">Proyecto Reciente</h2>
            <p className="text-gray-500 text-sm">Diseño de Aplicación Móvil</p>
            <Button variant="outline" className="mt-3">
              Reabrir Proyecto
            </Button>
          </div>
        </section>

        {/* Botones de navegación */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> Tablero Kanban
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Table2 className="w-4 h-4" /> Tabla de Tareas
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Calendario
          </Button>
        </div>

        {/* Tecnologías usadas */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tecnologías Utilizadas</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tecnologias.map((t, i) => (
            <div
              key={i}
              className={`rounded-xl shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg ${t.color}`}
            >
              <h3 className="font-bold text-lg mb-2">{t.nombre}</h3>
              <p className="text-sm text-gray-700">{t.rol}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-500">
          © 2025 Sistema Kanban — Proyecto Académico desarrollado con React + FastAPI
        </footer>
      </div>
    </main>
  );
}
