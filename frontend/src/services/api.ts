// src/services/api.ts
const API_URL = process.env.REACT_APP_API_URL;

// Función auxiliar para manejar respuestas
async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }
  
  return data;
}

export const authAPI = {
  // Registrar usuario
  async register(data: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },

  // Iniciar sesión
  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },

  // Refrescar token
  async refreshToken(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse(response);
  },
};

export default authAPI;
