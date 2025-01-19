import { QueryClient } from "@tanstack/react-query";

export class QueryError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

          const res = await fetch(queryKey[0] as string, {
            credentials: "include",
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!res.ok) {
            // Try to parse error response
            let errorData;
            try {
              errorData = await res.json();
            } catch {
              errorData = await res.text();
            }

            throw new QueryError(
              errorData?.error?.message || `HTTP Error: ${res.status} ${res.statusText}`,
              res.status,
              errorData
            );
          }

          const data = await res.json();
          return data;
        } catch (error) {
          if (error instanceof QueryError) {
            throw error;
          }

          if (error instanceof DOMException && error.name === 'AbortError') {
            throw new QueryError('Request timeout', 408);
          }

          if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new QueryError('Network error - Please check your connection', 0);
          }

          throw new QueryError(
            error instanceof Error ? error.message : 'Unknown error occurred',
            500
          );
        }
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: (failureCount, error) => {
        if (error instanceof QueryError) {
          // Don't retry client errors (4xx)
          if (error.status >= 400 && error.status < 500) return false;
          // Retry server errors up to MAX_RETRIES times
          return failureCount < MAX_RETRIES;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    },
    mutations: {
      retry: false,
      onError: (error: unknown) => {
        if (error instanceof QueryError) {
          console.error('Mutation error:', {
            status: error.status,
            message: error.message,
            data: error.data
          });
        }
      }
    }
  },
});