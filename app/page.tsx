'use client'; // Ensuring client-side rendering

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from '@chakra-ui/react'
import CurrenciesPage from "@/app/currencies/page";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CurrenciesPage />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}
