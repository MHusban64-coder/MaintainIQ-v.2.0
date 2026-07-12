import { forwardRef } from 'react'

const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    hint,
    className = '',
    containerClassName = '',
    required = false,
    rows = 4,
    ...props
  },
  ref
) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={[
          'w-full rounded-xl border bg-white text-secondary-900 text-sm',
          'px-4 py-2.5 outline-none transition-all duration-200 resize-none',
          'placeholder-secondary-400',
          'focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
          'dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-100',
          'dark:placeholder-secondary-500 dark:focus:ring-primary-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-danger focus:border-danger' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-secondary-400">{hint}</p>}
    </div>
  )
})

export default Textarea
