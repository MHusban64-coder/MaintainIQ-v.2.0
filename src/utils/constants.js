export const ASSET_CATEGORIES = ['IT equipment', 'Facilities', 'Safety', 'Vehicle', 'Office equipment', 'Other'];
export const ASSET_STATUSES = ['Operational', 'Needs attention', 'Under maintenance', 'Retired'];
export const MAINTENANCE_STATUSES = ['Scheduled', 'In progress', 'Completed'];
export const ISSUE_STATUSES = ['Open', 'In review', 'Resolved'];
export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export const statusTone = (status) => {
  const normalized = status?.toLowerCase();
  if (['operational', 'completed', 'resolved'].includes(normalized)) return 'success';
  if (['needs attention', 'in progress', 'in review', 'medium'].includes(normalized)) return 'warning';
  if (['retired', 'critical', 'high'].includes(normalized)) return 'danger';
  return 'info';
};
