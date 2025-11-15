import React, { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const response = await fetch("/api/restablecer-contraseña", {
      method: "PUT",
      body: JSON.stringify({ email: "user@example.com", new_password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.message) {
      setSuccess(true);
    } else {
      setError(result.detail || "Hubo un problema al restablecer la contraseña.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Restablecer Contraseña</h2>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Contraseña actualizada correctamente.</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Nueva Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Ingresa tu nueva contraseña"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Confirma tu nueva contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-blue-600 text-white"
        >
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
}
