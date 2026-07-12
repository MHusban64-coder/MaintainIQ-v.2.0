import { Eye, Pencil, QrCode, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, Card } from '../common';
import { statusTone } from '../../utils/constants';
import { warrantyState } from '../../utils/helpers';

export function AssetCard({ asset, onDelete, onQr }) {
  const warranty = warrantyState(asset.warrantyExpiry);
  return <Card className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-float">
    <div className="flex gap-4 p-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-100 text-lg font-bold text-slate-400 dark:bg-slate-800">
        {asset.image ? <img src={asset.image} alt="" className="h-full w-full object-cover" /> : asset.assetName?.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <Link to={`/assets/${asset.id}`} className="block truncate font-bold text-ink hover:text-brand-600 dark:text-white">{asset.assetName}</Link>
        <p className="mt-1 truncate text-xs text-muted">{asset.assetCode} · {asset.category}</p>
        <div className="mt-3 flex flex-wrap gap-2"><Badge tone={statusTone(asset.status)}>{asset.status}</Badge><Badge tone={warranty.tone}>{warranty.label}</Badge></div>
      </div>
    </div>
    <div className="grid grid-cols-2 border-t border-line text-xs dark:border-slate-800">
      <div className="border-r border-line px-4 py-3 text-muted dark:border-slate-800"><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</span><span className="mt-1 block truncate text-ink dark:text-slate-200">{asset.location || 'Unassigned'}</span></div>
      <div className="px-4 py-3 text-muted"><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned</span><span className="mt-1 block truncate text-ink dark:text-slate-200">{asset.assignedTo || 'Unassigned'}</span></div>
    </div>
    <div className="flex items-center gap-1 border-t border-line bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-950/40">
      <Link aria-label={`View ${asset.assetName}`} to={`/assets/${asset.id}`} className="rounded-lg p-2 text-muted hover:bg-white hover:text-brand-600 dark:hover:bg-slate-800"><Eye size={17} /></Link>
      <Link aria-label={`Edit ${asset.assetName}`} to={`/assets/${asset.id}/edit`} className="rounded-lg p-2 text-muted hover:bg-white hover:text-brand-600 dark:hover:bg-slate-800"><Pencil size={16} /></Link>
      <button aria-label={`Show QR code for ${asset.assetName}`} onClick={() => onQr(asset)} className="rounded-lg p-2 text-muted hover:bg-white hover:text-brand-600 dark:hover:bg-slate-800"><QrCode size={17} /></button>
      <button aria-label={`Delete ${asset.assetName}`} onClick={() => onDelete(asset)} className="ml-auto rounded-lg p-2 text-muted hover:bg-red-50 hover:text-danger dark:hover:bg-red-950/30"><Trash2 size={16} /></button>
    </div>
  </Card>;
}
