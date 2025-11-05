// src/services/api.ts
const API_URL = "http://localhost:3001";

// Función auxiliar para manejar respuestas
async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }
  
  return data;
}

// Función auxiliar para obtener headers con token
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
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

  // Obtener usuario actual
  async getCurrentUser() {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Verificar token
  async verifyToken() {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
};

export default authAPI;
