import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

export default function EditProfile({ user }) {
  const { notify } = useNotification();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      notify("Todos los campos son obligatorios.", "error");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      notify("Correo electrónico inválido.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        notify("Perfil actualizado correctamente.", "success");
      } else {
        notify("No se pudieron guardar los cambios.", "error");
      }
    } catch (err) {
      notify("Error de servidor, intenta nuevamente.", "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Actualizar Perfil
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Actualizando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
