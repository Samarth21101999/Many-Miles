import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './style.css';
import App from './App';
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <CookiesProvider>
    <App/>
    </CookiesProvider>
        
    </StrictMode>
)