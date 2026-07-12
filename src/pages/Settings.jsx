import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor, LogOut, Info, Zap, Shield, Bell } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { APP_NAME, APP_VERSION } from '@/utils/constants'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08 } }),
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-secondary-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function Settings() {
  const { logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/')
      toast.success('Logged out successfully.')
    } catch {
      toast.error('Failed to log out. Please try again.')
    }
  }

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <PageHeader title="Settings" subtitle="Manage your application preferences and account." />
      </motion.div>

      {/* Appearance */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
            <Monitor size={15} className="text-secondary-400" />
            Appearance
          </h3>
          <div className="divide-y divide-border dark:divide-secondary-700">
            <SettingRow
              label="Theme"
              description="Choose how MaintainIQ looks to you."
            >
              <div className="flex items-center gap-2">
                {themeOptions.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    aria-label={`Switch to ${label} mode`}
                    aria-pressed={theme === value}
                    className={[
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      theme === value
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600',
                    ].join(' ')}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                ))}
              </div>
            </SettingRow>
          </div>
        </Card>
      </motion.div>

      {/* Notifications placeholder */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell size={15} className="text-secondary-400" />
            Notifications
          </h3>
          <div className="divide-y divide-border dark:divide-secondary-700">
            <SettingRow
              label="In-app notifications"
              description="Toast alerts for asset changes and issue updates."
            >
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                Enabled
              </span>
            </SettingRow>
            <SettingRow
              label="Email notifications"
              description="Coming in a future update."
            >
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-500 dark:text-secondary-400 text-xs font-medium">
                Coming soon
              </span>
            </SettingRow>
          </div>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield size={15} className="text-secondary-400" />
            Security
          </h3>
          <div className="divide-y divide-border dark:divide-secondary-700">
            <SettingRow
              label="Authentication"
              description="Managed securely via Firebase Authentication."
            >
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                Active
              </span>
            </SettingRow>
            <SettingRow
              label="Data storage"
              description="All data is stored in Firebase Firestore and Storage."
            >
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-medium">
                <Zap size={10} />
                Firebase
              </span>
            </SettingRow>
          </div>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
            <Info size={15} className="text-secondary-400" />
            About {APP_NAME}
          </h3>
          <dl className="divide-y divide-border dark:divide-secondary-700">
            {[
              { label: 'Version', value: `v${APP_VERSION}` },
              { label: 'Platform', value: 'React 19 + Vite + Firebase' },
              { label: 'Built for', value: 'SMIT Final Hackathon · Batch 18' },
              { label: 'Tagline', value: 'Scan. Report. Maintain.' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-3 first:pt-0 last:pb-0 gap-4">
                <dt className="text-sm text-secondary-500 dark:text-secondary-400">{label}</dt>
                <dd className="text-sm font-medium text-secondary-900 dark:text-white text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-secondary-900 dark:text-white">Sign out</p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-0.5">
                You&apos;ll be redirected to the landing page.
              </p>
            </div>
            <Button variant="danger" icon={LogOut} size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
