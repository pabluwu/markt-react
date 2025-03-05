import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; // Importar CSS de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importar JS de Bootstrap


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
)
