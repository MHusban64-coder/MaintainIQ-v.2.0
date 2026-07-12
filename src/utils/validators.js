/**
 * Validate an email address format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate password strength (min 6 chars).
 */
export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6
}

/**
 * Check that a value is non-empty string.
 */
export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0
}

/**
 * Validate the Add Asset form fields.
 * Returns an object of field-level error messages.
 */
export function validateAssetForm(data) {
  const errors = {}
  if (!isRequired(data.assetName)) errors.assetName = 'Asset name is required.'
  if (!isRequired(data.category)) errors.category = 'Category is required.'
  if (!isRequired(data.location)) errors.location = 'Location is required.'
  if (!isRequired(data.status)) errors.status = 'Status is required.'
  if (data.purchaseDate && data.warrantyExpiry) {
    const purchase = new Date(data.purchaseDate)
    const warranty = new Date(data.warrantyExpiry)
    if (warranty < purchase) {
      errors.warrantyExpiry = 'Warranty expiry must be after purchase date.'
    }
  }
  return errors
}

/**
 * Validate the Register form.
 */
export function validateRegisterForm(data) {
  const errors = {}
  if (!isRequired(data.name)) errors.name = 'Full name is required.'
  if (!isRequired(data.email)) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!isRequired(data.password)) {
    errors.password = 'Password is required.'
  } else if (!isValidPassword(data.password)) {
    errors.password = 'Password must be at least 6 characters.'
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }
  return errors
}

/**
 * Validate the Login form.
 */
export function validateLoginForm(data) {
  const errors = {}
  if (!isRequired(data.email)) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!isRequired(data.password)) errors.password = 'Password is required.'
  return errors
}

/**
 * Validate the Issue Report form.
 */
export function validateIssueForm(data) {
  const errors = {}
  if (!isRequired(data.assetId)) errors.assetId = 'Please select an asset.'
  if (!isRequired(data.priority)) errors.priority = 'Priority is required.'
  if (!isRequired(data.description)) errors.description = 'Description is required.'
  return errors
}

/**
 * Validate the Maintenance Record form.
 */
export function validateMaintenanceForm(data) {
  const errors = {}
  if (!isRequired(data.technician)) errors.technician = 'Technician name is required.'
  if (!isRequired(data.maintenanceDate)) errors.maintenanceDate = 'Maintenance date is required.'
  if (!isRequired(data.description)) errors.description = 'Description is required.'
  if (!isRequired(data.status)) errors.status = 'Status is required.'
  return errors
}
