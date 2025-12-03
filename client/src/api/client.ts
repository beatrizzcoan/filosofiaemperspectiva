const getBaseUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_BACKEND_HOST;
  if (envUrl) {
    return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  }
  return "http://localhost:8000";
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = {
  getHeaders(isFormData: boolean = false) {
    const headers: HeadersInit = {};
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  },

  async get<T>(endpoint: string): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: apiClient.getHeaders(),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro na API (${response.status})`);
      }

      return response.json();
    } catch (error) {
      console.error(`[API GET] Erro em ${url}:`, error);
      throw error;
    }
  },

  async post<T>(endpoint: string, body: any): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: apiClient.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro na API (${response.status})`);
      }

      return response.json();
    } catch (error) {
      console.error(`[API POST] Erro em ${url}:`, error);
      throw error;
    }
  },

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;
    const isFormData = body instanceof FormData;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: apiClient.getHeaders(isFormData),
        body: isFormData ? body : JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro na API (${response.status})`);
      }

      return response.json();
    } catch (error) {
      console.error(`[API PATCH] Erro em ${url}:`, error);
      throw error;
    }
  },

  async put<T>(endpoint: string, body: any): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: apiClient.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro na API (${response.status})`);
      }

      return response.json();
    } catch (error) {
      console.error(`[API PUT] Erro em ${url}:`, error);
      throw error;
    }
  },

  async delete<T>(endpoint: string, body: any): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: apiClient.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Erro na API (${response.status})`);
      }

      // DELETE requests might not have a body, so we handle that case.
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      console.error(`[API DELETE] Erro em ${url}:`, error);
      throw error;
    }
  },
};
