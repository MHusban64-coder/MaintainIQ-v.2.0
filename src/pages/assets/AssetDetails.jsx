import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

export default function AssetDetails() {
  return (
    <div className="space-y-6">
      <PageHeader title="Asset Details" subtitle="View full asset information and history." />
      <Card>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          Asset details — implemented in Phase 2.
        </p>
      </Card>
    </div>
  )
}
