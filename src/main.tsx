import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {AppRoutes} from "./routes/AppRoutes.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {NotificationProvider} from "./context/NotificationContext.tsx";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AppRoutes/>
        </NotificationProvider>
      </QueryClientProvider>
    </StrictMode>,
)
