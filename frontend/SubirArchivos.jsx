import React, { useState, useEffect } from "react";
import { Upload, Trash2, FileText, Loader2 } from "lucide-react";

const almacenamiento = {};

export default function SubirArchivos({ taskId }) {
  const [archivos, setArchivos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    if (almacenamiento[taskId]) {
      setArchivos(almacenamiento[taskId]);
    }
  }, [taskId]);

  const guardarArchivos = (lista) => {
    almacenamiento[taskId] = lista;
    setArchivos(lista);
  };

  const subirArchivos = async (nuevos) => {
    setSubiendo(true);
    await new Promise((r) => setTimeout(r, 1000)); // Simula demora
    guardarArchivos([...archivos, ...nuevos]);
    setSubiendo(false);
  };

  const handleFileChange = (e) => {
    subirArchivos(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400");
    subirArchivos(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-400");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("border-blue-400");
  };

  const eliminarArchivo = (index) => {
    const nuevos = archivos.filter((_, i) => i !== index);
    guardarArchivos(nuevos);
  };

  const eliminarTodos = () => {
    guardarArchivos([]);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" /> Archivos Adjuntos
      </h2>

      <label
        htmlFor={`input-archivo-${taskId}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 cursor-pointer transition bg-gray-50"
      >
        {subiendo ? (
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
        ) : (
          <Upload className="w-8 h-8 text-gray-500 mb-2" />
        )}
        <p className="text-gray-700 font-medium">
          {subiendo ? "Subiendo archivos..." : "Haz clic o arrastra tus archivos aquí"}
        </p>
        <p className="text-gray-500 text-sm">Puedes seleccionar varios archivos</p>
        <input
          id={`input-archivo-${taskId}`}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={subiendo}
        />
      </label>

      {archivos.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-6 mb-2">
            <h3 className="text-gray-700 font-semibold">
              {archivos.length} archivo{archivos.length > 1 ? "s" : ""} subido{archivos.length > 1 ? "s" : ""}
            </h3>
            <button
              className="text-red-500 text-sm hover:underline flex items-center gap-1"
              onClick={eliminarTodos}
            >
              <Trash2 className="w-4 h-4" /> Eliminar todos
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {archivos.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-500 hover:text-red-500 transition"
                  onClick={() => eliminarArchivo(index)}
                  title="Eliminar archivo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {archivos.length === 0 && !subiendo && (
        <p className="text-gray-500 text-sm text-center mt-6">
          No hay archivos adjuntos todavía.
        </p>
      )}
    </div>
  );
}
