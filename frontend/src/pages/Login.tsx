import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Alias de ruta: /login redirige a /auth automáticamente
// Si ya está autenticado, envía directamente a /home
export default function Login() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  return <Navigate to="/auth" replace />;
}
