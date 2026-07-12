import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Package,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Plus,
  QrCode,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/context/AuthContext'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { StatCardSkeleton, Skeleton } from '@/components/ui/Skeleton'
import { formatRelativeTime, formatDate } from '@/utils/formatters'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: 'easeOut' },
  }),
}

function StatCard({ icon: Icon, label, value, sub, color, trend, loading, delay }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={delay}>
      <Card className="h-full" hover>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 mb-2 uppercase tracking-wide">
                {label}
              </p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white mb-1">
                {value ?? '—'}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">{sub}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={20} />
            </div>
          </div>
        )}
        {!loading && trend !== undefined && (
          <div className="mt-4 pt-4 border-t border-border dark:border-secondary-700 flex items-center gap-1.5">
            {trend > 0 ? (
              <TrendingUp size={13} className="text-success" />
            ) : trend < 0 ? (
              <TrendingDown size={13} className="text-danger" />
            ) : (
              <Minus size={13} className="text-secondary-400" />
            )}
            <span className={`text-xs font-medium ${trend > 0 ? 'text-success' : trend < 0 ? 'text-danger' : 'text-secondary-400'}`}>
              {trend > 0 ? `+${trend}` : trend} this week
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

function QuickAction({ icon: Icon, label, to, color }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300 text-center leading-tight">
          {label}
        </span>
      </motion.div>
    </Link>
  )
}

export default function Dashboard() {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentAssets, setRecentAssets] = useState([])
  const [recentIssues, setRecentIssues] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingRecent, setLoadingRecent] = useState(true)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  useEffect(() => {
    async function fetchStats() {
      try {
        const [totalSnap, pendingSnap, issuesSnap, completedSnap] = await Promise.all([
          getCountFromServer(collection(db, 'assets')),
          getCountFromServer(query(collection(db, 'maintenance'), where('status', '==', 'scheduled'))),
          getCountFromServer(query(collection(db, 'issues'), where('status', '==', 'open'))),
          getCountFromServer(query(collection(db, 'maintenance'), where('status', '==', 'completed'))),
        ])
        setStats({
          totalAssets: totalSnap.data().count,
          pendingMaintenance: pendingSnap.data().count,
          openIssues: issuesSnap.data().count,
          completedMaintenance: completedSnap.data().count,
        })
      } catch {
        setStats({ totalAssets: 0, pendingMaintenance: 0, openIssues: 0, completedMaintenance: 0 })
      } finally {
        setLoadingStats(false)
      }
    }

    async function fetchRecent() {
      try {
        const [assetsSnap, issuesSnap] = await Promise.all([
          getDocs(query(collection(db, 'assets'), orderBy('createdAt', 'desc'), limit(5))),
          getDocs(query(collection(db, 'issues'), orderBy('createdAt', 'desc'), limit(4))),
        ])
        setRecentAssets(assetsSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setRecentIssues(issuesSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch {
        // non-fatal
      } finally {
        setLoadingRecent(false)
      }
    }

    fetchStats()
    fetchRecent()
  }, [])

  const statCards = [
    {
      icon: Package,
      label: 'Total Assets',
      value: stats?.totalAssets,
      sub: 'Registered in the system',
      color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
      trend: undefined,
    },
    {
      icon: Wrench,
      label: 'Pending Maintenance',
      value: stats?.pendingMaintenance,
      sub: 'Scheduled service tasks',
      color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      trend: undefined,
    },
    {
      icon: AlertCircle,
      label: 'Reported Issues',
      value: stats?.openIssues,
      sub: 'Open issues requiring attention',
      color: 'bg-red-50 text-danger dark:bg-red-900/20 dark:text-red-400',
      trend: undefined,
    },
    {
      icon: CheckCircle2,
      label: 'Maintenance Done',
      value: stats?.completedMaintenance,
      sub: 'Completed service records',
      color: 'bg-green-50 text-success dark:bg-green-900/20 dark:text-green-400',
      trend: undefined,
    },
  ]

  const quickActions = [
    { icon: Plus, label: 'Add Asset', to: '/assets/new', color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' },
    { icon: QrCode, label: 'Scan QR', to: '/scan', color: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400' },
    { icon: AlertCircle, label: 'Report Issue', to: '/issues/new', color: 'bg-red-50 text-danger dark:bg-red-900/20 dark:text-red-400' },
    { icon: Wrench, label: 'Log Maintenance', to: '/maintenance/new', color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <PageHeader
          title={`${greeting()}, ${currentUser?.displayName?.split(' ')[0] || 'there'} 👋`}
          subtitle={`Here's what's happening with your assets today — ${formatDate(new Date())}`}
        >
          <Button icon={Plus} size="sm" as={Link} onClick={() => {}}>
            <Link to="/assets/new" className="contents">Add Asset</Link>
          </Button>
        </PageHeader>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {loadingStats
          ? Array.from({ length: 4 }).map((_, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                <StatCardSkeleton />
              </motion.div>
            ))
          : statCards.map((card, i) => (
              <StatCard key={card.label} {...card} loading={false} delay={i + 1} />
            ))}
      </div>

      {/* Quick actions + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <Card>
            <Card.Header>
              <h2 className="text-sm font-semibold text-secondary-900 dark:text-white">Quick Actions</h2>
            </Card.Header>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <QuickAction key={action.label} {...action} />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Assets */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-secondary-900 dark:text-white">Recent Assets</h2>
              <Link
                to="/assets"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {loadingRecent ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-2.5 w-1/3" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentAssets.length === 0 ? (
              <div className="text-center py-8">
                <Package size={32} className="mx-auto text-secondary-300 dark:text-secondary-600 mb-2" />
                <p className="text-sm text-secondary-500 dark:text-secondary-400">No assets yet.</p>
                <Link to="/assets/new" className="text-xs text-primary-600 hover:underline mt-1 inline-block">
                  Add your first asset →
                </Link>
              </div>
            ) : (
              <ul className="space-y-3" role="list">
                {recentAssets.map((asset) => (
                  <li key={asset.id}>
                    <Link
                      to={`/assets/${asset.id}`}
                      className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0 overflow-hidden">
                        {asset.image ? (
                          <img src={asset.image} alt={asset.assetName} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Package size={16} className="text-primary-600 dark:text-primary-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {asset.assetName}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                          {asset.category} · {formatRelativeTime(asset.createdAt)}
                        </p>
                      </div>
                      <Badge variant={asset.status || 'active'} dot>
                        {(asset.status || 'active').charAt(0).toUpperCase() + (asset.status || 'active').slice(1)}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Recent Issues */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-secondary-900 dark:text-white">Recent Issues</h2>
            <Link
              to="/issues"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loadingRecent ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-secondary-50 dark:bg-secondary-700/30">
                  <Skeleton className="w-2 h-full rounded-full min-h-[48px]" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentIssues.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 size={32} className="mx-auto text-success mb-2" />
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                No open issues. Everything looks good!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex gap-3 p-3 rounded-xl bg-secondary-50 dark:bg-secondary-700/30 border border-border dark:border-secondary-700"
                >
                  <div
                    className={`w-1 rounded-full shrink-0 ${
                      issue.priority === 'critical' ? 'bg-danger' :
                      issue.priority === 'high' ? 'bg-orange-500' :
                      issue.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-blue-400'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                      {issue.description?.length > 60
                        ? issue.description.slice(0, 60) + '…'
                        : issue.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={issue.priority || 'low'} size="sm">
                        {issue.priority || 'low'}
                      </Badge>
                      <span className="text-xs text-secondary-400">
                        {formatRelativeTime(issue.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* System status strip */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8}>
        <div className="flex flex-wrap items-center gap-4 px-5 py-3.5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              All systems operational
            </span>
          </div>
          <div className="h-3 w-px bg-green-200 dark:bg-green-800 hidden sm:block" aria-hidden="true" />
          <span className="text-xs text-green-600 dark:text-green-500">Firebase · Authentication · Firestore · Storage</span>
        </div>
      </motion.div>
    </div>
  )
}
