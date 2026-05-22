import { API_CONFIG } from './config';
import { ApiError } from './errors';

type RequestOptions = RequestInit & {
  timeoutMs?: number;
};

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { timeoutMs = API_CONFIG.timeoutMs, ...fetchOptions } = options;
  const url = `${API_CONFIG.baseUrl}${endpoint}`;

  const response = await withTimeout(fetch(url, fetchOptions), timeoutMs);

  if (!response.ok) {
    throw new ApiError(`HTTP error ${response.status}`, response.status, url);
  }

  return (await response.json()) as T;
}
