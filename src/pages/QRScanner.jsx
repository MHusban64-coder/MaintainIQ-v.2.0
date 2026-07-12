import { QrCode } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

export default function QRScanner() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <PageHeader title="QR Scanner" subtitle="Scan an asset QR code to open its profile." />
      <Card className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-4">
          <QrCode size={26} className="text-primary-600 dark:text-primary-400" />
        </div>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          QR scanner — implemented in Phase 2.
        </p>
      </Card>
    </div>
  )
}
