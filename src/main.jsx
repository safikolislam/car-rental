import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import AuthProvider from './Provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'aos/dist/aos.css';
import Aos from 'aos';
Aos.init()
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className="montserrat-normal">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    </div>
  </StrictMode>
)
