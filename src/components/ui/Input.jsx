import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon: Icon,
    iconPosition = 'left',
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
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon size={16} className="text-secondary-400" />
          </div>
        )}
        <input
          ref={ref}
          className={[
            'w-full rounded-xl border bg-white text-secondary-900 text-sm',
            'placeholder-secondary-400 outline-none transition-all duration-200',
            'focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
            'dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-100',
            'dark:placeholder-secondary-500 dark:focus:ring-primary-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-danger focus:border-danger focus:ring-red-100 dark:focus:ring-red-900'
              : 'border-border',
            Icon && iconPosition === 'left' ? 'pl-9 pr-4 py-2.5' : '',
            Icon && iconPosition === 'right' ? 'pl-4 pr-9 py-2.5' : '',
            !Icon ? 'px-4 py-2.5' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon size={16} className="text-secondary-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-secondary-400">{hint}</p>
      )}
    </div>
  )
})

export default Input
