import { ArrowLeft, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export default function NotFoundPage() { return <div className="grid min-h-screen place-items-center bg-canvas p-6 text-center dark:bg-slate-950"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/50"><Map size={30} /></div><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">404</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-ink dark:text-white">This route is uncharted.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">The page you’re looking for has moved, or never made it into the asset registry.</p><Link to="/" className="mt-7 inline-block"><Button><ArrowLeft size={16} />Back to home</Button></Link></div></div>; }
