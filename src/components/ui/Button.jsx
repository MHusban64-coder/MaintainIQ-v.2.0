import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  secondary: 'bg-secondary-900 text-white hover:bg-secondary-800 focus:ring-secondary-700 shadow-sm dark:bg-secondary-700 dark:hover:bg-secondary-600',
  outline: 'border border-border bg-white text-secondary-700 hover:bg-secondary-50 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-200 dark:hover:bg-secondary-700',
  ghost: 'text-secondary-600 hover:bg-secondary-100 focus:ring-secondary-300 dark:text-secondary-300 dark:hover:bg-secondary-800',
  danger: 'bg-danger text-white hover:bg-red-600 focus:ring-red-500 shadow-sm',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400 shadow-sm',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      className={[
        'inline-flex items-center justify-center font-medium rounded-xl',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 16} className="animate-spin shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon size={size === 'sm' ? 14 : 16} className="shrink-0" />
      ) : null}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={size === 'sm' ? 14 : 16} className="shrink-0" />
      )}
    </motion.button>
  )
})

export default Button
