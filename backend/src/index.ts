import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import boardRoutes from "./routes/board.routes";
import statsRoutes from "./routes/Stats/stats.routes";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", boardRoutes);
app.use("/api/stats", statsRoutes);

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Funcionando biens: http://localhost:${PORT}/api/Ta Biens`);
  console.log(`Stats endpoint: http://localhost:${PORT}/api/stats`);
});
