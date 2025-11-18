const getBaseUrl = (): string => {
  let envUrl = import.meta.env.VITE_BACKEND_HOST;
  if (envUrl) {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }
  return 'http://localhost:8000';
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = {
  getHeaders() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async get<T>(endpoint: string): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
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
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
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
  
};
