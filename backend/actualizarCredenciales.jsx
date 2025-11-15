import React, { useState } from "react";

export default function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos antes de hacer el submit
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

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
        setSuccess(true);
      } else {
        setError("Hubo un error al actualizar los datos. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo más tarde.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Actualizar Perfil</h2>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-md">
          <strong>Error: </strong>{error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded-md">
          <strong>¡Éxito! </strong>Tu perfil ha sido actualizado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar Perfil"}
          </button>
        </div>
      </form>
    </div>
  );
}
