import React, { useState, useEffect } from "react";
import "./estilos.css";

// Simulación de almacenamiento global (ej: reemplazar por API o backend real)
const storageAdjuntos = {};

export default function SubirArchivos({ taskId }) {
  const [archivos, setArchivos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  // Cargar archivos de la tarea al montar
  useEffect(() => {
    if (storageAdjuntos[taskId]) {
      setArchivos(storageAdjuntos[taskId]);
    }
  }, [taskId]);

  // Guardar archivos asociados a la tarea
  const actualizarStorage = (nuevos) => {
    storageAdjuntos[taskId] = nuevos;
    setArchivos(nuevos);
  };

  // Maneja selección de archivos desde input
  const handleFileChange = async (e) => {
    const nuevos = Array.from(e.target.files);
    await subirArchivos(nuevos);
  };

  // Maneja arrastrar y soltar
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

  // Simula subida al servidor
  const subirArchivos = async (nuevos) => {
    setSubiendo(true);
    await new Promise((res) => setTimeout(res, 1000)); // simulación de delay
    actualizarStorage([...archivos, ...nuevos]);
    setSubiendo(false);
  };

  // Eliminar archivo de la lista
  const eliminarArchivo = (index) => {
    const nuevos = archivos.filter((_, i) => i !== index);
    actualizarStorage(nuevos);
  };

  return (
    <div className="postit-container">
      <div
        className="postit"
        role="region"
        aria-label={`Adjuntos de la tarea ${taskId}`}
      >
        <div className="pin">📎</div>
        <div className="title">Adjuntos</div>

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
              {subiendo ? "Subiendo..." : "Subir archivo"}
            </div>
            <div className="sub">Haz click o arrastra aquí</div>
          </div>
          <input
            id={`adjunto-file-${taskId}`}
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={subiendo}
          />
        </label>

        <div className="attachments" id={`lista-adjuntos-${taskId}`}>
          {archivos.length === 0 ? (
            <div className="empty">No hay archivos adjuntos</div>
          ) : (
            archivos.map((file, index) => (
              <div className="attachment" key={index}>
                <div className="file-icon">
                  {file.name.split(".").pop().toUpperCase()}
                </div>
                <div className="name">{file.name}</div>
                <div className="meta">
                  {(file.size / 1024).toFixed(1)} KB
                </div>
                <button
                  className="remove"
                  aria-label="Eliminar adjunto"
                  onClick={() => eliminarArchivo(index)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
