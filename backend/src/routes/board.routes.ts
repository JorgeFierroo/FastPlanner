import { Router, Request, Response } from "express";

// ¿Qué es Router?
// Es como un mini-servidor que maneja rutas específicas
const router = Router();

// ¿Cómo funciona una ruta?
// router.MÉTODO(URL, FUNCIÓN)
// Cuando llegue una petición con ese MÉTODO a esa URL, ejecuta esa FUNCIÓN

// RUTA 1: GET /boards - Obtener todos los tableros
router.get("/", (req: Request, res: Response) => {
  // Por ahora devolvemos datos falsos para probar
  // Más tarde esto vendrá de la base de datos
  const tableros = [
    { id: 1, title: "Mi primer tablero", ownerId: 1 },
    { id: 2, title: "Proyecto FastPlanner", ownerId: 1 }
  ];
  
  res.json(tableros);
});

// RUTA 2: GET /boards/:id - Obtener un tablero específico
router.get("/:id", (req: Request, res: Response) => {
  // ¿Qué es req.params.id?
  // Si alguien va a /boards/123, entonces req.params.id = "123"
  const id = req.params.id;
  
  // Por ahora simulamos buscar el tablero
  const tablero = {
    id: Number(id),
    title: `Tablero ${id}`,
    ownerId: 1,
    lists: [
      { id: 1, title: "Por hacer" },
      { id: 2, title: "En progreso" },
      { id: 3, title: "Completado" }
    ]
  };
  
  res.json(tablero);
});

// RUTA 3: POST /boards - Crear un nuevo tablero
router.post("/", (req: Request, res: Response) => {
  // ¿Qué es req.body?
  // Son los datos que envía el frontend (title, ownerId, etc.)
  const { title, ownerId } = req.body;
  
  // Validación básica
  if (!title || !ownerId) {
    return res.status(400).json({ 
      error: "Título y propietario son requeridos" 
    });
  }
  
  // Simulamos crear el tablero
  const nuevoTablero = {
    id: Date.now(), // ID temporal
    title,
    ownerId: Number(ownerId),
    createdAt: new Date()
  };
  
  // ¿Por qué status 201?
  // 201 = "Created" - algo nuevo fue creado exitosamente
  res.status(201).json(nuevoTablero);
});

// RUTA 4: PUT /boards/:id - Actualizar un tablero
router.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "Título es requerido" });
  }
  
  // Simulamos actualizar
  const tableroActualizado = {
    id: Number(id),
    title,
    updatedAt: new Date()
  };
  
  res.json(tableroActualizado);
});

// RUTA 5: DELETE /boards/:id - Eliminar un tablero
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  
  // Simulamos eliminar
  res.json({ 
    message: `Tablero ${id} eliminado exitosamente`,
    deletedId: Number(id)
  });
});

// ¿Por qué exportamos router?
// Para que otros archivos puedan usar estas rutas
export default router;