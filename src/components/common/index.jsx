import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Search, X } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const buttonStyles = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border border-line bg-white text-ink hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost: 'text-muted hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800 dark:hover:text-slate-100',
  danger: 'bg-danger text-white hover:bg-red-600',
};

export function Button({ children, className, variant = 'primary', size = 'md', loading, type = 'button', ...props }) {
  return <button type={type} disabled={loading || props.disabled} className={cn('inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:focus:ring-offset-slate-950', size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-sm', buttonStyles[variant], className)} {...props}>{loading && <LoadingSpinner size="sm" />}{children}</button>;
}

export const Input = forwardRef(function Input({ label, error, className, hint, ...props }, ref) {
  return <label className="block text-sm font-medium text-ink dark:text-slate-100">{label && <span className="mb-2 block">{label}</span>}<input ref={ref} className={cn('h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-950', error ? 'border-danger' : 'border-line', className)} {...props} />{hint && !error && <span className="mt-1.5 block text-xs font-normal text-muted">{hint}</span>}{error && <span className="mt-1.5 flex items-center gap-1 text-xs font-normal text-danger"><AlertCircle size={13} />{error}</span>}</label>;
});

export function Select({ label, error, children, className, ...props }) {
  return <label className="block text-sm font-medium text-ink dark:text-slate-100">{label && <span className="mb-2 block">{label}</span>}<select className={cn('h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-950', error ? 'border-danger' : 'border-line', className)} {...props}>{children}</select>{error && <span className="mt-1.5 block text-xs font-normal text-danger">{error}</span>}</label>;
}

export function Card({ children, className, ...props }) { return <section className={cn('rounded-2xl border border-line bg-white shadow-card dark:border-slate-800 dark:bg-slate-900', className)} {...props}>{children}</section>; }

export function Badge({ children, tone = 'info', className }) {
  const styles = { success: 'bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-400/10 dark:text-green-300', warning: 'bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-400/10 dark:text-amber-300', danger: 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-300', info: 'bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-400/10 dark:text-blue-300' };
  return <span className={cn('inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', styles[tone], className)}>{children}</span>;
}

export function LoadingSpinner({ size = 'md' }) { return <span aria-label="Loading" className={cn('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', size === 'sm' ? 'h-4 w-4' : 'h-7 w-7')} />; }
export function Skeleton({ className }) { return <div className={cn('animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800', className)} />; }

export function PageHeader({ eyebrow, title, description, actions }) { return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>}<h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-white">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>}</div>{actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}</div>; }
export function SectionHeader({ title, description, action }) { return <div className="flex items-start justify-between gap-3"><div><h2 className="font-bold text-ink dark:text-white">{title}</h2>{description && <p className="mt-1 text-sm text-muted">{description}</p>}</div>{action}</div>; }

export function SearchInput({ value, onChange, placeholder = 'Search', className }) { return <div className={cn('relative', className)}><Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-11 w-full rounded-xl border border-line bg-white py-2 pl-10 pr-9 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-950" />{value && <button aria-label="Clear search" onClick={() => onChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:bg-slate-100 dark:hover:bg-slate-800"><X size={16} /></button>}</div>; }

export function EmptyState({ icon: Icon, title, description, action }) { return <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-slate-50/70 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/40"><div className="mb-4 rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-950/60"><Icon size={26} /></div><h3 className="font-bold text-ink dark:text-white">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted">{description}</p>{action && <div className="mt-5">{action}</div>}</div>; }

export function ErrorState({ title = 'Something went wrong', description, action }) { return <div role="alert" className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 px-6 py-8 text-center dark:border-red-950 dark:bg-red-950/20"><AlertCircle className="text-danger" size={28} /><h3 className="mt-3 font-bold text-ink dark:text-white">{title}</h3><p className="mt-2 text-sm text-muted">{description}</p>{action && <div className="mt-4">{action}</div>}</div>; }

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) { return <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end bg-slate-950/45 p-4 sm:items-center sm:justify-center" onMouseDown={onClose}><motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()} className={cn('max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-float dark:bg-slate-900 sm:p-6', maxWidth)}><div className="mb-5 flex items-center justify-between gap-3"><h2 id="modal-title" className="text-lg font-bold text-ink dark:text-white">{title}</h2><button aria-label="Close dialog" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></div>{children}</motion.div></motion.div>}</AnimatePresence>; }

export function ConfirmationDialog({ open, onClose, onConfirm, loading, title = 'Are you sure?', description, confirmLabel = 'Confirm' }) { return <Modal open={open} onClose={onClose} title={title}><p className="text-sm leading-6 text-muted">{description}</p><div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" loading={loading} onClick={onConfirm}>{confirmLabel}</Button></div></Modal>; }

export function SuccessMark() { return <CheckCircle2 className="text-success" size={18} />; }
