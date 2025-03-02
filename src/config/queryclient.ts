import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            gcTime: 0,
            retry: 0,
        },
        mutations: {
            gcTime: 0,
            retry: 0,
        },
    },
});
