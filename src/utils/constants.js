export const APP_NAME = 'MaintainIQ'
export const APP_VERSION = '1.0.0'
export const APP_TAGLINE = 'Scan. Report. Maintain.'

export const ASSET_CATEGORIES = [
  'Electronics',
  'Furniture',
  'Machinery',
  'Vehicles',
  'HVAC',
  'Plumbing',
  'Electrical',
  'IT Equipment',
  'Safety Equipment',
  'Other',
]

export const ASSET_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'In Maintenance' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'retired', label: 'Retired' },
]

export const ISSUE_PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

export const ISSUE_STATUSES = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]

export const MAINTENANCE_STATUSES = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alpha_asc', label: 'A → Z' },
  { value: 'alpha_desc', label: 'Z → A' },
]

export const FIREBASE_ERRORS = {
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'permission-denied': 'You do not have permission to perform this action.',
  'not-found': 'The requested resource was not found.',
  'unavailable': 'Service temporarily unavailable. Please try again.',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  ASSETS: '/assets',
  ASSET_NEW: '/assets/new',
  ASSET_DETAIL: '/assets/:id',
  ASSET_EDIT: '/assets/:id/edit',
  QR_SCANNER: '/scan',
  MAINTENANCE_NEW: '/maintenance/new',
  ISSUES: '/issues',
  ISSUE_NEW: '/issues/new',
  PROFILE: '/profile',
  SETTINGS: '/settings',
}
