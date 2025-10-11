import React, { useState, useEffect } from "react";
import "./estilos.css";

// Simulación de almacenamiento global (puede reemplazarse por API real)
const almacenamiento = {};

export default function SubirArchivos({ taskId }) {
  const [archivos, setArchivos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [editando, setEditando] = useState(null); // índice del archivo que se está editando
  const [nuevoNombre, setNuevoNombre] = useState("");

  // Cargar archivos al montar el componente
  useEffect(() => {
    if (almacenamiento[taskId]) {
      setArchivos(almacenamiento[taskId]);
    }
  }, [taskId]);

  // Guardar cambios en el almacenamiento simulado
  const actualizarStorage = (nuevos) => {
    almacenamiento[taskId] = nuevos;
    setArchivos(nuevos);
  };

  // Subir archivos desde input o drag & drop
  const subirArchivos = async (nuevos) => {
    setSubiendo(true);
    await new Promise((res) => setTimeout(res, 800)); // Simula delay
    actualizarStorage([...archivos, ...nuevos]);
    setSubiendo(false);
  };

  // Eliminar archivo individual
  const eliminarArchivo = (index) => {
    const nuevos = archivos.filter((_, i) => i !== index);
    actualizarStorage(nuevos);
  };

  // Eliminar todos los archivos
  const eliminarTodos = () => {
    actualizarStorage([]);
  };

  // Cambiar nombre del archivo
  const guardarNuevoNombre = (index) => {
    if (!nuevoNombre.trim()) return;
    const nuevos = [...archivos];
    const file = nuevos[index];
    const extension = file.name.split(".").pop();
    const blobNuevo = new File([file], `${nuevoNombre}.${extension}`, { type: file.type });
    nuevos[index] = blobNuevo;
    actualizarStorage(nuevos);
    setEditando(null);
    setNuevoNombre("");
  };

  // Manejadores de drag & drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const nuevos = Array.from(e.dataTransfer.files);
    e.currentTarget.classList.remove("drag-over");
    await subirArchivos(nuevos);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleFileChange = async (e) => {
    const nuevos = Array.from(e.target.files);
    await subirArchivos(nuevos);
  };

  return (
    <div className="postit-container">
      <div className="postit" role="region" aria-label={`Adjuntos de la tarea ${taskId}`}>
        <div className="pin">📎</div>
        <div className="title">Archivos Adjuntos</div>

        {/* Zona de carga */}
        <label
          className="file-drop"
          tabIndex="0"
          htmlFor={`adjunto-file-${taskId}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="icon">{subiendo ? "…" : "+"}</div>
          <div className="copy">
            <div className="main">
              {subiendo ? "Subiendo archivos..." : "Subir o arrastrar archivos"}
            </div>
            <div className="sub">Puedes subir varios a la vez</div>
          </div>
          <input
            id={`adjunto-file-${taskId}`}
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={subiendo}
          />
        </label>

        {/* Lista de archivos */}
        <div className="attachments" id={`lista-adjuntos-${taskId}`}>
          {archivos.length === 0 ? (
            <div className="empty">No hay archivos adjuntos</div>
          ) : (
            archivos.map((file, index) => (
              <div className="attachment" key={index}>
                <div className="file-icon">
                  {file.name.split(".").pop().toUpperCase()}
                </div>

                {/* Renombrar archivo */}
                {editando === index ? (
                  <input
                    type="text"
                    className="rename-input"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    onBlur={() => guardarNuevoNombre(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") guardarNuevoNombre(index);
                      if (e.key === "Escape") {
                        setEditando(null);
                        setNuevoNombre("");
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    className="name"
                    onDoubleClick={() => {
                      setEditando(index);
                      setNuevoNombre(file.name.replace(/\.[^/.]+$/, ""));
                    }}
                    title="Doble clic para renombrar"
                  >
                    {file.name}
                  </div>
                )}

                <div className="meta">{(file.size / 1024).toFixed(1)} KB</div>

                <div className="actions">
                  <button
                    className="remove"
                    aria-label="Eliminar adjunto"
                    onClick={() => eliminarArchivo(index)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botón eliminar todo */}
        {archivos.length > 0 && (
          <button className="remove-all" onClick={eliminarTodos}>
            🗑️ Eliminar todos
          </button>
        )}
      </div>
    </div>
  );
}
