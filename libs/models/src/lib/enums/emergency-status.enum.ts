export enum EmergencyStatus {
  PENDING = 'PENDING', // Reported but not yet handled
  IN_PROGRESS = 'IN_PROGRESS', // Currently being handled
  RESOLVED = 'RESOLVED', // Successfully resolved
  CANCELLED = 'CANCELLED', // Report was incorrect or no longer relevant
  ESCALATED = 'ESCALATED', // Requires higher authority intervention
  WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE', // No ambulance or responders available
  ON_HOLD = 'ON_HOLD', // Temporarily paused due to external factors
  FAILED = 'FAILED', // Attempt to resolve was unsuccessful

  /** Location-Based Statuses */
  AT_SCENE = 'AT_SCENE', // Responders have arrived at the incident location
  IN_AMBULANCE = 'IN_AMBULANCE', // Patient is inside an ambulance
  IN_TRANSIT_TO_HOSPITAL = 'IN_TRANSIT_TO_HOSPITAL', // En route to a medical facility
  ARRIVED_AT_HOSPITAL = 'ARRIVED_AT_HOSPITAL', // Patient has reached the hospital
  TREATED_AT_HOME = 'TREATED_AT_HOME', // Medical assistance provided at home, no transport
}
