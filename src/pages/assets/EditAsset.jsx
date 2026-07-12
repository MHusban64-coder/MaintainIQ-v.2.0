import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

export default function EditAsset() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Edit Asset" subtitle="Update asset information." />
      <Card>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          Edit form — implemented in Phase 2.
        </p>
      </Card>
    </div>
  )
}
