import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import boardRoutes from "./routes/board.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/auth", authRoutes);

// Levantamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
