"use client";

// Create a QueryClientProvider that wraps the whole application. According to
// https://brockherion.dev/blog/posts/setting-up-and-using-react-query-in-nextjs/

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react";

const Providers = ({ children }: {children: React.ReactNode}) => {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default Providers;