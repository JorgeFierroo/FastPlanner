import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Llamar a la API en cuanto este
    console.log("Registro:", email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSumbit} className="rounded bg-white shadow-md w-96 p-8">
        <h2 className="font-bold text-center mb-6">Registrarse</h2>
        <input 
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full mb-4 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input 
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full mb-4 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200" 
        />
        <input 
          type="password"
          placeholder="Confirme su contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded w-full mb-4 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button 
          type="submit" 
          className="border rounded bg-green-100 hover:bg-green-200 w-full p-2 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
