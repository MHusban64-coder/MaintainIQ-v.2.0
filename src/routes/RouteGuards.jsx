import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../components/common';
import { useAuth } from '../hooks/useAuth';

function RouteLoading() { return <div className="grid min-h-screen place-items-center bg-canvas text-brand-600 dark:bg-slate-950"><LoadingSpinner /></div>; }
export function ProtectedRoute() { const { user, loading } = useAuth(); const location = useLocation(); if (loading) return <RouteLoading />; return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />; }
export function PublicRoute() { const { user, loading } = useAuth(); if (loading) return <RouteLoading />; return user ? <Navigate to="/dashboard" replace /> : <Outlet />; }
export function AdminRoute() { const { profile, loading } = useAuth(); if (loading) return <RouteLoading />; return profile?.role === 'Admin' ? <Outlet /> : <Navigate to="/dashboard" replace />; }
