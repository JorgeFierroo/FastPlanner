import { useState } from "react";
import {Link} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    // Llamar a la API en cuanto este
    console.log("Login:", email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSumbit} className="bg-white p-8 rounded shadow-md">
        <h2 className="font-bold text-center mb-6">Iniciar Sesión</h2>
        <input 
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full" 
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={email}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
        />
        <button type="submit" className="rounded bg-blue-100 hover:bg-blue-200 w-full py-2 transition">Entrar</button>
        <p>
          ¿No tienes cuenta?
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrate Aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
