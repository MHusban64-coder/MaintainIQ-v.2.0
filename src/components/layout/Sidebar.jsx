import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  Wrench,
  AlertCircle,
  User,
  Settings,
  LogOut,
  QrCode,
  X,
  Zap,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { APP_NAME } from '@/utils/constants'
import toast from 'react-hot-toast'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Assets', icon: Package, to: '/assets' },
  { label: 'Maintenance', icon: Wrench, to: '/issues', end: false },
  { label: 'Issues', icon: AlertCircle, to: '/issues' },
  { label: 'QR Scanner', icon: QrCode, to: '/scan' },
]

const bottomItems = [
  { label: 'Profile', icon: User, to: '/profile' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

function NavItem({ item, collapsed, onClick }) {
  return (
    <NavLink
      to={item.to}
      end={item.end !== false}
      onClick={onClick}
      className={({ isActive }) => [
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
        'transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
        isActive
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
          : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700/60 dark:hover:text-secondary-100',
      ].join(' ')}
    >
      <item.icon
        size={18}
        className="shrink-0"
      />
      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
      {collapsed && (
        <span className="sr-only">{item.label}</span>
      )}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
  const { logout, currentUser } = useAuth()
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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-secondary-900 dark:text-white text-base tracking-tight">
            {APP_NAME}
          </span>
        )}
        {/* Mobile close button */}
        {mobileOpen !== undefined && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1 rounded-lg text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="w-full h-px bg-border dark:bg-secondary-700 shrink-0" />

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            collapsed={collapsed}
            onClick={onMobileClose}
          />
        ))}
      </nav>

      <div className="w-full h-px bg-border dark:bg-secondary-700 shrink-0" />

      {/* Bottom nav */}
      <nav className="px-3 py-4 space-y-1" aria-label="User navigation">
        {bottomItems.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            collapsed={collapsed}
            onClick={onMobileClose}
          />
        ))}
        <button
          onClick={handleLogout}
          className={[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
            'text-secondary-500 hover:bg-red-50 hover:text-danger',
            'dark:text-secondary-500 dark:hover:bg-red-900/20 dark:hover:text-red-400',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
          {collapsed && <span className="sr-only">Logout</span>}
        </button>
      </nav>

      {/* User chip */}
      {!collapsed && currentUser && (
        <div className="px-4 pb-4 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary-50 dark:bg-secondary-700/50">
            <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center shrink-0 text-white text-xs font-semibold">
              {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-secondary-900 dark:text-white truncate">
                {currentUser.displayName || 'User'}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={[
          'hidden lg:flex flex-col h-screen sticky top-0',
          'bg-white dark:bg-secondary-900',
          'border-r border-border dark:border-secondary-700',
          'transition-all duration-300 shrink-0',
          collapsed ? 'w-16' : 'w-60',
        ].join(' ')}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-secondary-900/50 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={[
                'fixed inset-y-0 left-0 z-50 w-72',
                'flex flex-col',
                'bg-white dark:bg-secondary-900',
                'border-r border-border dark:border-secondary-700',
                'lg:hidden',
              ].join(' ')}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
