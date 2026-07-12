import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'

export default function ReportIssue() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Report Issue" subtitle="Flag a problem with an asset." />
      <Card>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          Issue report form — implemented in Phase 2.
        </p>
      </Card>
    </div>
  )
}
