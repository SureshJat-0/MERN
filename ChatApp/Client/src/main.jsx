import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './Context/Socket'
import { UserProvider } from './Context/User.jsx'

createRoot(document.getElementById('root')).render(
    <SocketProvider >
        <UserProvider>
        <App />
        </UserProvider>
    </SocketProvider>
)
