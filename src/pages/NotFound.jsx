import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Zap } from 'lucide-react'
import { APP_NAME } from '@/utils/constants'
import { useAuth } from '@/context/AuthContext'

export default function NotFound() {
  const { currentUser } = useAuth()
  const destination = currentUser ? '/dashboard' : '/'
  const destinationLabel = currentUser ? 'Go to Dashboard' : 'Go Home'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-6">
      {/* Logo */}
      <Link to={destination} className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
          <Zap size={15} className="text-white" />
        </div>
        <span className="font-bold text-secondary-900 dark:text-white">{APP_NAME}</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-lg"
      >
        {/* 404 graphic */}
        <div className="relative mb-8 inline-block">
          <div className="text-[8rem] sm:text-[10rem] font-black text-secondary-100 dark:text-secondary-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 shadow-elevated flex items-center justify-center">
              <Zap size={36} className="text-primary-600" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-secondary-500 dark:text-secondary-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the URL or head back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={destination}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-primary-600 hover:bg-primary-700 font-medium text-sm transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home size={15} />
            {destinationLabel}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 font-medium text-sm transition-all hover:bg-secondary-50 dark:hover:bg-secondary-700 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
