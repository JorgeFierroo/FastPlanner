import exp from "constants";
import { getTokens, setTokens, clearTokens } from "./authStorage";

const API_URL = process.env.REACT_APP_API_URL;
let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

// Función auxiliar para manejar respuestas
async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }
  
  return data;
}

// Funcion para refrescar access token si es necesario
async function refreshAccessToken() {
  console.log("Refrescando access token...");
  const { refreshToken } = getTokens();
  if (!refreshToken) throw new Error("No hay refresh token disponible");

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  
  if (!response.ok) {
    throw new Error("No se pudo refrescar el token");
  }
  const data = await response.json();
  const newAccessToken = data.accessToken;
  setTokens({ accessToken: newAccessToken, refreshToken });

  return newAccessToken;
}


// Funcion unica para hacer fetch con manejo de tokens
export async function apiFetch(input: string, options: RequestInit = {}) {
  const { accessToken } = getTokens();

  // Añadir token a headers
  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(`${API_URL}${input}`, finalOptions);

  // Si no es 401, retornar respuesta
  if (response.status !== 401) {
    return handleResponse(response);
  }

  // Si es 401, intentar refrescar token
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const newAccessToken = await refreshAccessToken();
      
      // Reintentar todas las solicitudes pendientes
      pendingRequests.forEach((callback) => callback(newAccessToken));
      pendingRequests = [];
    } catch (error) {
      clearTokens();
      throw error;
    } finally {
      isRefreshing = false;
    }
  }

  // Si es que se está refrescando, esperar
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      pendingRequests.push(async (newToken: string) => {
        finalOptions.headers = {
          ...(finalOptions.headers || {}),
          Authorization: `Bearer ${newToken}`,
        };
        resolve(fetch(`${API_URL}${input}`, finalOptions).then(handleResponse).catch(reject));
      });
    });
  }

  // Reintentar la solicitud original con el nuevo token
  const { accessToken: newAccessToken } = getTokens();
  finalOptions.headers = {
    ...(finalOptions.headers || {}),
    Authorization: `Bearer ${newAccessToken}`,
  };
  response = await fetch(`${API_URL}${input}`, finalOptions);
  return handleResponse(response);
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

export const projectsAPI = {
  // Obtener proyectos del usuario
  async getProjects(accessToken: string) {
    const response = await fetch(`${API_URL}/projects`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return handleResponse(response);
  },

  // Datos de un proyecto específico
  async getProjectById(accessToken: string, projectId: string) {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return handleResponse(response);
  }
}

export default authAPI;
