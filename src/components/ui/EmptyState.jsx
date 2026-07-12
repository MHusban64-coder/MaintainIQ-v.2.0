import Button from './Button'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  actionIcon,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className,
      ].join(' ')}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center mb-4">
          <Icon size={26} className="text-secondary-400 dark:text-secondary-500" />
        </div>
      )}
      <h3 className="text-base font-semibold text-secondary-900 dark:text-white mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-secondary-500 dark:text-secondary-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && actionLabel && (
        <Button onClick={action} icon={actionIcon} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
