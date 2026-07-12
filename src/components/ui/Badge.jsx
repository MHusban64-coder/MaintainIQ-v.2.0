const variants = {
  // Asset statuses
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  maintenance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  inactive: 'bg-secondary-100 text-secondary-500 dark:bg-secondary-700 dark:text-secondary-400',
  retired: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',

  // Issue priorities
  low: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  critical: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',

  // Issue statuses
  open: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  in_progress: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  closed: 'bg-secondary-100 text-secondary-500 dark:bg-secondary-700 dark:text-secondary-400',

  // Maintenance statuses
  scheduled: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',

  // Warranty
  valid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  expiring: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  expired: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  unknown: 'bg-secondary-100 text-secondary-500 dark:bg-secondary-700 dark:text-secondary-400',

  // Generic
  default: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-700 dark:text-secondary-300',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const color = variants[variant] || variants.default

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        color,
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      )}
      {children}
    </span>
  )
}
