export default function SectionHeader({
  title,
  subtitle,
  action,
  className = '',
}) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div>
        <h2 className="text-base font-semibold text-secondary-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
