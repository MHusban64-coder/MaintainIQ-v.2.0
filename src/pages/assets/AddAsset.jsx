import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

export default function AddAsset() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Add Asset" subtitle="Register a new asset in the system." />
      <Card>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          Asset form — implemented in Phase 2.
        </p>
      </Card>
    </div>
  )
}
