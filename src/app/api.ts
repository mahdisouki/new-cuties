export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function apiUrl() {
  const url = import.meta.env.VITE_API_URL;
  if (!url) throw new Error("Missing VITE_API_URL");
  return url;
}

export async function request<T>(path: string, options?: { method?: string; body?: unknown; token?: string | null }) {
  const headers: Record<string, string> = {};
  if (options?.body !== undefined) headers["Content-Type"] = "application/json";
  if (options?.token) headers.Authorization = `Bearer ${options.token}`;

  const response = await fetch(`${apiUrl()}${path}`, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 204) return undefined as T;

  const data = (await response.json()) as { error?: string };
  if (!response.ok) throw new ApiError(data.error ?? "Request failed", response.status);
  return data as T;
}
