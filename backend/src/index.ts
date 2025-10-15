// src/index.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Montamos las rutas de usuario
app.use("/users", userRoutes);

// Levantamos el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
