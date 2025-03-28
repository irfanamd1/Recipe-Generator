import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
	<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
		<Toaster position="top-center" reverseOrder={false} />
  		<App />
    </ClerkProvider>
)
