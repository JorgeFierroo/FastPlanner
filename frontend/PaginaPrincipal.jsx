import React from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Sistema Kanban Colaborativo
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Gestiona tus tareas, proyectos y equipos de manera visual y eficiente. 
        Desarrollado con tecnologías modernas como React, Tailwind y FastAPI.
      </p>

      <div className="flex justify-center gap-4 mb-10">
        <Button>Ver Tablero Kanban</Button>
        <Button variant="outline">Ver Tabla de Tareas</Button>
        <Button variant="secondary">Calendario</Button>
      </div>

      <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { nombre: "React.js", rol: "Frontend", color: "bg-blue-100" },
          { nombre: "TailwindCSS", rol: "Estilos", color: "bg-cyan-100" },
          { nombre: "FastAPI", rol: "Backend", color: "bg-green-100" },
          { nombre: "SQLite", rol: "Base de datos", color: "bg-yellow-100" },
          { nombre: "Lucide React", rol: "Iconos", color: "bg-pink-100" },
          { nombre: "React-DnD", rol: "Arrastrar y soltar", color: "bg-purple-100" },
        ].map((t, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow ${t.color}`}
          >
            <h3 className="font-semibold text-lg">{t.nombre}</h3>
            <p className="text-sm text-gray-600">{t.rol}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
