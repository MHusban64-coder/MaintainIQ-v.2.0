import { motion } from 'framer-motion'

function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const base = [
    'bg-white dark:bg-secondary-800',
    'border border-border dark:border-secondary-700',
    'rounded-2xl shadow-card',
    paddings[padding] || paddings.md,
    className,
  ].join(' ')

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)' }}
        transition={{ duration: 0.2 }}
        className={`${base} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-border dark:border-secondary-700 ${className}`}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Footer = CardFooter

export default Card
