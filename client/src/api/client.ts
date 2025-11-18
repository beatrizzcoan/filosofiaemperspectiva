const getBaseUrl = (): string => {
  let envUrl = import.meta.env.VITE_BACKEND_HOST;

  if (envUrl) {
    return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  }

  return "http://localhost:8000";
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    console.log(`[API] Buscando: ${url}`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Erro na API (${response.status}): ${errorBody || response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error(`[API] Erro ao conectar com ${url}:`, error);
      throw error;
    }
  },
};
