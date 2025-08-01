'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/home";
//import { Suspense } from "react";

const queryClient = new QueryClient();

const Page: React.FC = () => {
  return (
   // <Suspense>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
   // </Suspense>
  )
}

export default Page