import type { FieldErrors } from "../entities";
import { sessionStore } from "./sessionStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fields: FieldErrors = {},
  ) {
    super(message);
  }
}

type Options = Omit<RequestInit, "body"> & { body?: unknown; auth?: boolean };

export async function http<T>(path: string, { body, auth, headers, ...init }: Options = {}): Promise<T> {
  const isForm = body instanceof FormData;
  const token = auth ? sessionStore.get()?.token : undefined;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(isForm || body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor", 0);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && auth) sessionStore.clear();
    throw new ApiError(data.message ?? "Algo deu errado", response.status, data.fields ?? {});
  }
  return data as T;
}
