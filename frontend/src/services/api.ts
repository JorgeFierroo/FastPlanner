// src/services/api.ts
const API_URL = "http://localhost:3001/api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Guardar tokens en localStorage
function storeTokens(accessToken?: string, refreshToken?: string) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Limpiar tokens
function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Obtener headers con token
function getAuthHeaders() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Manejo de respuesta base
async function baseHandleResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (data && (data.error || data.message)) || "Error en la solicitud";
    const err = new Error(message) as any;
    // Propagar status para lógica de refresco
    (err.status = response.status);
    throw err;
  }
  return data;
}

// Intento de solicitud con refresco automático en 401
async function requestWithAutoRefresh(input: RequestInfo | URL, init?: RequestInit, retry = true) {
  try {
    const res = await fetch(input, init);
    return await baseHandleResponse(res);
  } catch (err: any) {
    if (retry && err.status === 401) {
      // Intentar refrescar el access token
      const rt = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!rt) throw err;

      const refreshed = await authAPI.refresh(rt);
      storeTokens(refreshed.accessToken);

      // Reintentar la solicitud original con nuevo token
      const headers = new Headers(init?.headers || {});
      headers.set("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` || "");
      const retried = await fetch(input, { ...init, headers });
      return await baseHandleResponse(retried);
    }
    throw err;
  }
}

export const authAPI = {
  // Registrar usuario
  async register(data: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await baseHandleResponse(response);
    // Esperamos { user, accessToken, refreshToken }
    if (result?.accessToken) {
      storeTokens(result.accessToken, result.refreshToken);
    }
    return result;
  },

  // Iniciar sesión
  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await baseHandleResponse(response);
    if (result?.accessToken) {
      storeTokens(result.accessToken, result.refreshToken);
    }
    return result;
  },

  // Obtener usuario actual
  async getCurrentUser() {
    return requestWithAutoRefresh(`${API_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  },

  // Verificar token
  async verifyToken() {
    return requestWithAutoRefresh(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  },

  // Refrescar access token
  async refresh(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await baseHandleResponse(response);
    // Devuelve { accessToken, expiresIn }
    return data;
  },

  // Logout (revoca el refresh token actual)
  async logout(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await baseHandleResponse(response);
    clearTokens();
    return data;
  },
};

export default authAPI;
