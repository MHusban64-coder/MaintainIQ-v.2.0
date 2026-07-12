import { Package, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

export default function AssetList() {
  return (
    <div className="space-y-6">
      <PageHeader title="Assets" subtitle="Manage and track all your registered assets.">
        <Button icon={Plus} size="sm">
          <Link to="/assets/new" className="contents">Add Asset</Link>
        </Button>
      </PageHeader>
      <EmptyState
        icon={Package}
        title="No assets yet"
        description="Get started by adding your first asset. Each asset gets a unique QR code for instant access."
        action={() => {}}
        actionLabel="Add First Asset"
        actionIcon={Plus}
      />
    </div>
  )
}
