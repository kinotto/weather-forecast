'use client'
import AlertGrid from "@/app/components/alert-grid/AlertGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../styles/global.scss";

const queryClient = new QueryClient();

const Home: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <main >
        <AlertGrid />
      </main>
    </QueryClientProvider>
  )
}

export default Home