import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, LayoutDashboard, Table2, Calendar } from "lucide-react";

export default function Inicio() {
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
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Panel de Inicio — Sistema Kanban
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Organiza tus proyectos y tareas de forma visual, intuitiva y colaborativa.
            Este sistema combina <span className="font-semibold">React</span> con 
            <span className="font-semibold"> FastAPI</span> para lograr eficiencia, 
            escalabilidad y una interfaz moderna.
          </p>
        </div>

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

        <footer className="mt-16 text-sm text-gray-500">
          © 2025 Sistema Kanban — Proyecto Académico desarrollado con React + FastAPI
        </footer>
      </div>
    </main>
  );
}
