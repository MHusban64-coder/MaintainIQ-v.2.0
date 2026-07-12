import { useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
  className = '',
  autoFocus = false,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={15} className="text-secondary-400" />
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={[
          'w-full pl-9 pr-8 py-2.5 text-sm rounded-xl',
          'border border-border bg-white text-secondary-900',
          'placeholder-secondary-400 outline-none transition-all duration-200',
          'focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
          'dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-100',
          'dark:placeholder-secondary-500 dark:focus:ring-primary-900',
        ].join(' ')}
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(''); onClear?.() }}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
