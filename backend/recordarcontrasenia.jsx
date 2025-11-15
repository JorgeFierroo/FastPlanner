import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/recuperar-contraseña", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.message) {
      setMessage(result.message);
    } else {
      setError(result.detail || "Hubo un problema al enviar el enlace.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h2>

      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-500">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Ingresa tu correo"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar enlace de restablecimiento"}
        </button>
      </form>
    </div>
  );
}
