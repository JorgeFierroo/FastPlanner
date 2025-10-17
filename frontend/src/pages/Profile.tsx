import React, { useState } from "react";

const Profile: React.FC = () => {
  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "Juanito",
    correo: "juanito@example.com",
    rol: "Administrador",
    bio: "el admin",
  });

  const [actividad] = useState([
    "Creó la tarjeta 'Diseño de Landing Page'",
    "Comentó en 'Bug en el Login'",
    "Completó la tarea 'Actualizar README'",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Perfil</h1>

        {/* Avatar y datos básicos */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-purple-400 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-gray-200">
            {usuario.nombre.charAt(0)}
          </div>

          {editando ? (
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              className="mt-4 text-xl font-semibold text-gray-800 border-b-2 border-gray-300 focus:outline-none"
            />
          ) : (
            <p className="mt-4 text-xl font-semibold text-gray-800">{usuario.nombre}</p>
          )}

          <p className="text-gray-500">{usuario.rol}</p>
        </div>

        {/* Información editable */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Correo:</label>
            {editando ? (
              <input
                type="email"
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                className="bg-gray-50 p-2 rounded border w-full focus:outline-none border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-2 rounded border border-gray-200">{usuario.correo}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Biografía:</label>
            {editando ? (
              <textarea
                name="bio"
                value={usuario.bio}
                onChange={handleChange}
                className="bg-gray-50 p-2 rounded border w-full focus:outline-none border-gray-300"
              />
            ) : (
              <p className="bg-gray-50 p-2 rounded border border-gray-200">{usuario.bio}</p>
            )}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Actividad reciente</h2>
          <ul className="space-y-1">
            {actividad.map((act, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded border border-gray-200 hover:shadow-md transition-shadow">
                {act}
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setEditando(!editando)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {editando ? "Guardar" : "Editar Perfil"}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
