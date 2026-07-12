import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/helpers';

export function AppLayout() { const [mobileOpen, setMobileOpen] = useState(false); const { logout } = useAuth(); const navigate = useNavigate(); const handleLogout = async () => { try { await logout(); toast.success('You have been signed out.'); navigate('/login'); } catch (error) { toast.error(getErrorMessage(error)); } };
  return <div className="min-h-screen bg-canvas dark:bg-slate-950"><Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onLogout={handleLogout} /><div className="lg:pl-64"><Topbar onMenu={() => setMobileOpen(true)} /><main className="mx-auto max-w-[1600px] p-4 pb-10 sm:p-6 sm:pb-12 lg:p-8"><Outlet /></main></div></div>; }
