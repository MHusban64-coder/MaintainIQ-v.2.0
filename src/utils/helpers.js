export const cn = (...values) => values.filter(Boolean).join(' ');

export const formatDate = (value, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return '—';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));

export const getErrorMessage = (error) => {
  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-credential': 'That email or password is not correct.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/weak-password': 'Use a password with at least 6 characters.',
    'auth/user-not-found': 'We could not find an account with that email.',
    'auth/too-many-requests': 'Too many attempts. Please try again shortly.',
    'permission-denied': 'You do not have permission to perform this action.',
    'unavailable': 'The service is unavailable right now. Please try again.',
    'not-found': 'We could not find that item.',
  };
  return messages[error?.code] || 'Something went wrong. Please try again.';
};

export const createAssetCode = () => `MIQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const createQrValue = (assetId, assetCode) => JSON.stringify({ type: 'maintainiq-asset', assetId, assetCode });

export const parseQrValue = (value) => {
  try {
    const parsed = JSON.parse(value);
    return parsed?.type === 'maintainiq-asset' ? parsed : { assetCode: value.trim() };
  } catch {
    return { assetCode: value.trim() };
  }
};

export const warrantyState = (expiry) => {
  if (!expiry) return { label: 'No warranty date', tone: 'info' };
  const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 86400000);
  if (days < 0) return { label: 'Expired', tone: 'danger' };
  if (days <= 60) return { label: `${days}d remaining`, tone: 'warning' };
  return { label: 'Covered', tone: 'success' };
};
