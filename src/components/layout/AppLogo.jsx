import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import mark from '../../assets/maintainiq-mark.svg';

export function AppLogo({ compact = false, className }) { return <Link to="/dashboard" className={cn('inline-flex items-center gap-2.5 font-bold text-ink dark:text-white', className)}><img src={mark} alt="" className="h-9 w-9" />{!compact && <span className="text-lg tracking-tight">MaintainIQ</span>}</Link>; }
