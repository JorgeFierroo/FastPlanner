import React, { useState } from "react";
import "./estilos.css"; // Usa el CSS que ya te pasé

export default function SubirArchivos() {
  const [archivos, setArchivos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

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

    // Aquí iría la lógica real de subida con fetch/axios
    await new Promise((res) => setTimeout(res, 1000));

    setArchivos((prev) => [...prev, ...nuevos]);
    setSubiendo(false);
  };

  // Eliminar archivo de la lista
  const eliminarArchivo = (index) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="postit-container">
      <div className="postit" role="region" aria-label="Subir archivos de la tarea">
        <div className="pin">!</div>
        <div className="title">Adjuntos</div>

        <label
          className="file-drop"
          tabIndex="0"
          htmlFor="adjunto-file"
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
            id="adjunto-file"
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={subiendo}
          />
        </label>

        <div className="attachments" id="lista-adjuntos">
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
