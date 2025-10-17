export const initialData = {
  columns: [
    {
      id: "todo",
      title: "Por hacer",
      cards: [
        { id: 1, title: "Configurar entorno", description: "Instalar dependencias y preparar entorno" },
        { id: 2, title: "Diseñar UI", description: "Maquetar diseño con Tailwind y React" },
      ],
    },
    {
      id: "in-progress",
      title: "En progreso",
      cards: [
        { id: 3, title: "Integrar API", description: "Conectar con el backend" },
      ],
    },
    {
      id: "done",
      title: "Hecho",
      cards: [
        { id: 4, title: "Configurar repositorio", description: "Subido a GitHub" },
      ],
    },
  ],
}
