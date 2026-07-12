import { BarChart3, ClipboardCheck, LayoutDashboard, LogOut, QrCode, Settings, ShieldCheck, UserRound, Wrench, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/helpers';
import { AppLogo } from './AppLogo';

const navigation = [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, { to: '/assets', label: 'Assets', icon: Wrench }, { to: '/scanner', label: 'Scan QR', icon: QrCode }, { to: '/maintenance', label: 'Maintenance', icon: ClipboardCheck }, { to: '/issues', label: 'Issues', icon: BarChart3 }];
const personal = [{ to: '/profile', label: 'Profile', icon: UserRound }, { to: '/settings', label: 'Settings', icon: Settings }];
const admin = { to: '/admin', label: 'Administration', icon: ShieldCheck };
const linkClass = ({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300' : 'text-muted hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800 dark:hover:text-slate-100');
function Links({ items, onClose }) { return items.map(({ to, label, icon: Icon }) => <NavLink onClick={onClose} key={to} to={to} className={linkClass}><Icon size={18} />{label}</NavLink>); }

export function Sidebar({ mobileOpen, onClose, onLogout }) {
  const { profile } = useAuth();
  const items = profile?.role === 'Admin' ? [...navigation, admin] : navigation;
  const logout = () => { onClose(); onLogout(); };
  return <><aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:flex"><AppLogo className="px-2 py-2" /><nav className="mt-8 space-y-1"><Links items={items} /></nav><div className="mt-auto space-y-1 border-t border-line pt-4 dark:border-slate-800"><Links items={personal} /><button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-red-50 hover:text-danger dark:hover:bg-red-950/30"><LogOut size={18} />Log out</button></div></aside><div className={cn('fixed inset-0 z-50 bg-slate-950/45 transition lg:hidden', mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={onClose}><aside onClick={(event) => event.stopPropagation()} className={cn('flex h-full w-72 flex-col bg-white p-4 shadow-float transition-transform dark:bg-slate-950', mobileOpen ? 'translate-x-0' : '-translate-x-full')}><div className="flex items-center justify-between"><AppLogo /><button aria-label="Close menu" onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19} /></button></div><nav className="mt-8 space-y-1"><Links items={items} onClose={onClose} /></nav><div className="mt-auto space-y-1 border-t border-line pt-4 dark:border-slate-800"><Links items={personal} onClose={onClose} /><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger hover:bg-red-50 dark:hover:bg-red-950/30"><LogOut size={18} />Log out</button></div></aside></div></>;
}
