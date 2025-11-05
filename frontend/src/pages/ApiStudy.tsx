/**
 * 📘 Ejemplo práctico y didáctico para aprender a consumir una API en React.
 * Este código demuestra cómo:
 *  - Hacer una petición GET a una API pública.
 *  - Manejar los estados de carga (loading) y error.
 *  - Mostrar los datos en pantalla.
 *  - Refrescar la información manualmente.
 *
 * 🔧 Requisitos:
 *  - React (con hooks)
 *  - Fetch API (ya incluida en los navegadores modernos)
 */

import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button"; // Usamos tu botón reutilizable

// 🧩 Tipo de datos que esperamos recibir de la API
// Esto no es obligatorio, pero ayuda a tener tipado fuerte en TypeScript.
interface Post {
  id: number;
  title: string;
  body: string;
}

const ApiStudy: React.FC = () => {
  // 📦 Estados para manejar el ciclo de vida de la petición
  const [posts, setPosts] = useState<Post[]>([]);   // almacena los datos
  const [loading, setLoading] = useState<boolean>(true); // indica si está cargando
  const [error, setError] = useState<string | null>(null); // almacena error si ocurre

  // 🔄 Función que hace la petición a la API
  const fetchData = async () => {
    try {
      setLoading(true);   // empezamos cargando
      setError(null);     // limpiamos cualquier error previo

      // 🌐 API pública de ejemplo (devuelve 100 posts falsos)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");

      // Verificamos si la respuesta fue exitosa (status 200)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Convertimos la respuesta a JSON
      const data: Post[] = await response.json();

      // Guardamos los datos en el estado
      setPosts(data.slice(0, 10)); // mostramos solo 10 para mantenerlo limpio
    } catch (err: any) {
      // Si algo falla (problemas de red, error HTTP, etc.)
      setError(err.message || "Error desconocido al cargar la API");
    } finally {
      // En cualquier caso, dejamos de estar en modo “cargando”
      setLoading(false);
    }
  };

  // ⚡ useEffect: se ejecuta una vez al montar el componente
  useEffect(() => {
    fetchData();
  }, []); // [] → significa “solo una vez”

  // 💬 Render del componente
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-black">Estudio de API</h1>
      <p className="text-neutral-darkgray">
        Ejemplo básico de cómo consumir y manejar datos de una API en React.
      </p>

      {/* Botón para recargar los datos manualmente */}
      <Button variant="primary" onClick={fetchData}>
        Recargar Datos
      </Button>

      {/* Estado de carga */}
      {loading && <p className="text-blue-500 font-medium">Cargando datos...</p>}

      {/* Estado de error */}
      {error && <p className="text-red-500">❌ {error}</p>}

      {/* Listado de datos */}
      {!loading && !error && (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 border border-neutral-gray rounded-lg bg-neutral-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-neutral-black">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-darkgray">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiStudy;
