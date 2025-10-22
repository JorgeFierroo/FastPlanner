import React, { useState } from "react";

const Configuracion: React.FC = () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [idioma, setIdioma] = useState("es");
  const [nombreUsuario, setNombreUsuario] = useState("martingonzalez");

  const handleGuardar = () => {
    console.log("Configuraciones guardadas:", { modoOscuro, idioma, nombreUsuario });
    alert("Cambios guardados (simulado)");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Ajustes</h1>

      {/* Perfil */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Perfil</h2>
        <label className="block mb-1 text-sm font-medium">Nombre de usuario</label>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-purple-300"
        />
      </section>

      {/* Apariencia */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Apariencia</h2>
        <div className="flex items-center justify-between">
          <label htmlFor="modoOscuro" className="text-sm font-medium">
            Modo oscuro
          </label>
          <input
            id="modoOscuro"
            type="checkbox"
            checked={modoOscuro}
            onChange={(e) => setModoOscuro(e.target.checked)}
            className="w-5 h-5"
          />
        </div>
      </section>

      {/* Idioma */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Idioma</h2>
        <select
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
      </section>

      {/* Botón Guardar */}
      <button
        onClick={handleGuardar}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default Configuracion;

