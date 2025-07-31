'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/home";

const queryClient = new QueryClient();

const Page: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default Page