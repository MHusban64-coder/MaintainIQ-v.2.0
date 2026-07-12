import { FIREBASE_ERRORS } from './constants'

/**
 * Format a Firestore Timestamp or JS Date to a readable date string.
 */
export function formatDate(value, options = {}) {
  if (!value) return '—'
  const date = value?.toDate ? value.toDate() : new Date(value)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

/**
 * Format a date to relative time (e.g. "2 days ago").
 */
export function formatRelativeTime(value) {
  if (!value) return '—'
  const date = value?.toDate ? value.toDate() : new Date(value)
  if (isNaN(date.getTime())) return '—'
  const diff = Date.now() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  if (weeks < 5) return `${weeks}w ago`
  if (months < 12) return `${months}mo ago`
  return formatDate(value)
}

/**
 * Format currency.
 */
export function formatCurrency(amount, currency = 'USD') {
  if (amount === null || amount === undefined || amount === '') return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount))
}

/**
 * Capitalize first letter of each word.
 */
export function titleCase(str) {
  if (!str) return ''
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Convert a Firebase error code to a human-readable message.
 */
export function formatFirebaseError(error) {
  if (!error) return 'An unexpected error occurred.'
  const code = error?.code || ''
  return FIREBASE_ERRORS[code] || error?.message || 'An unexpected error occurred.'
}

/**
 * Generate a short unique asset code with a prefix.
 */
export function generateAssetCode(prefix = 'AST') {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Truncate a string to a max length.
 */
export function truncate(str, max = 40) {
  if (!str) return ''
  return str.length > max ? `${str.slice(0, max)}…` : str
}

/**
 * Format file size in human-readable form.
 */
export function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i++
  }
  return `${size.toFixed(1)} ${units[i]}`
}

/**
 * Check if a warranty date is expired or expiring soon (within 30 days).
 */
export function warrantyStatus(warrantyExpiry) {
  if (!warrantyExpiry) return 'unknown'
  const expiry = warrantyExpiry?.toDate ? warrantyExpiry.toDate() : new Date(warrantyExpiry)
  if (isNaN(expiry.getTime())) return 'unknown'
  const now = Date.now()
  const diff = expiry.getTime() - now
  const thirtyDays = 30 * 24 * 60 * 60 * 1000
  if (diff < 0) return 'expired'
  if (diff < thirtyDays) return 'expiring'
  return 'valid'
}
