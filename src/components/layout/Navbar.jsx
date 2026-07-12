import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  QrCode,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { APP_NAME } from '@/utils/constants'
import toast from 'react-hot-toast'

function UserAvatar({ user, size = 8 }) {
  const initials = (user?.displayName || user?.email || 'U')[0].toUpperCase()
  if (user?.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || 'User avatar'}
        className={`w-${size} h-${size} rounded-full object-cover ring-2 ring-white dark:ring-secondary-700`}
      />
    )
  }
  return (
    <div className={`w-${size} h-${size} rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white dark:ring-secondary-700`}>
      {initials}
    </div>
  )
}

export default function Navbar({ onMenuToggle, sidebarCollapsed, onSidebarToggle }) {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    setDropdownOpen(false)
    try {
      await logout()
      navigate('/')
      toast.success('Logged out successfully.')
    } catch {
      toast.error('Failed to log out.')
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 sm:px-6 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-border dark:border-secondary-700">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
        className="p-2 rounded-xl text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar collapse toggle */}
      <button
        onClick={onSidebarToggle}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="hidden lg:flex p-2 rounded-xl text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Menu size={18} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* QR Scanner shortcut */}
        <Link
          to="/scan"
          aria-label="Open QR Scanner"
          className="p-2 rounded-xl text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <QrCode size={18} />
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-xl text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications (visual only) */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-800 dark:hover:text-secondary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-600" aria-hidden="true" />
        </button>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <UserAvatar user={currentUser} />
            <span className="hidden sm:block text-sm font-medium text-secondary-700 dark:text-secondary-200 max-w-[120px] truncate">
              {currentUser?.displayName || 'Account'}
            </span>
            <ChevronDown
              size={14}
              className={`text-secondary-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 rounded-2xl shadow-elevated overflow-hidden"
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-border dark:border-secondary-700">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                    {currentUser?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate mt-0.5">
                    {currentUser?.email}
                  </p>
                </div>

                {/* Menu items */}
                <div className="p-1.5 space-y-0.5">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-xl transition-colors"
                  >
                    <User size={15} />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-xl transition-colors"
                  >
                    <Settings size={15} />
                    Settings
                  </Link>
                  <div className="h-px bg-border dark:bg-secondary-700 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
