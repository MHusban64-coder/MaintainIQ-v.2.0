import { AlertCircle, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

export default function IssueList() {
  return (
    <div className="space-y-6">
      <PageHeader title="Issues" subtitle="Track and manage reported asset issues.">
        <Button icon={Plus} size="sm">
          <Link to="/issues/new" className="contents">Report Issue</Link>
        </Button>
      </PageHeader>
      <EmptyState
        icon={AlertCircle}
        title="No issues reported"
        description="No open issues at the moment. Report a problem when you spot one."
        action={() => {}}
        actionLabel="Report Issue"
        actionIcon={Plus}
      />
    </div>
  )
}
