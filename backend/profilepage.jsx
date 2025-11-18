import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ProfilePage() {
  // Datos de perfil de ejemplo
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    completedTasks: 12,
    pendingTasks: 5,
  };

  // Datos para la visualización (gráfico de tareas completadas vs pendientes)
  const data = {
    labels: ["Completadas", "Pendientes"],
    datasets: [
      {
        label: "Tareas",
        data: [user.completedTasks, user.pendingTasks],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} tareas`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Encabezado del perfil */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Gráfico de tareas */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas de Tareas</h2>
        <Line data={data} options={options} />
      </div>

      {/* Otros datos */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Adicional</h2>
        <ul>
          <li className="text-gray-600">
            <strong>Nombre:</strong> {user.name}
          </li>
          <li className="text-gray-600">
            <strong>Correo:</strong> {user.email}
          </li>
          <li className="text-gray-600">
            <strong>Tareas Completadas:</strong> {user.completedTasks}
          </li>
          <li className="text-gray-600">
            <strong>Tareas Pendientes:</strong> {user.pendingTasks}
          </li>
        </ul>
      </div>
    </div>
  );
}
