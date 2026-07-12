import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';
import './styles/index.css';

createRoot(document.getElementById('root')).render(<StrictMode><ThemeProvider><AuthProvider><BrowserRouter><AppRoutes /></BrowserRouter><Toaster position="top-right" toastOptions={{ duration: 4000, style: { borderRadius: '12px', padding: '12px 14px', color: '#0F172A' } }} /></AuthProvider></ThemeProvider></StrictMode>);
