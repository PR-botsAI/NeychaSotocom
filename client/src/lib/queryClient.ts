import { QueryClient } from "@tanstack/react-query";

class QueryError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

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

          return res.json();
        } catch (error) {
          if (error instanceof QueryError) {
            throw error;
          }

          if (error instanceof DOMException && error.name === 'AbortError') {
            throw new QueryError('Request timeout', 408);
          }

          if (error instanceof TypeError && error.message === 'Failed to fetch') {
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
          // Retry server errors up to 3 times
          return failureCount < 3;
        }
        return false;
      },
    },
    mutations: {
      retry: false,
    }
  },
});