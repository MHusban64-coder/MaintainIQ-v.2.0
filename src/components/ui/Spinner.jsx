export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
    xl: 'w-12 h-12 border-[3px]',
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        'rounded-full border-secondary-200 border-t-primary-600 animate-spin',
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm z-40">
      <Spinner size="lg" />
    </div>
  )
}
