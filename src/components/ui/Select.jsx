import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    options = [],
    placeholder = 'Select…',
    className = '',
    containerClassName = '',
    required = false,
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
      <div className="relative">
        <select
          ref={ref}
          className={[
            'w-full appearance-none rounded-xl border bg-white text-secondary-900 text-sm',
            'px-4 py-2.5 pr-9 outline-none transition-all duration-200',
            'focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
            'dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-100',
            'dark:focus:ring-primary-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-danger focus:border-danger'
              : 'border-border',
            className,
          ].join(' ')}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown size={15} className="text-secondary-400" />
        </div>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-secondary-400">{hint}</p>}
    </div>
  )
})

export default Select
