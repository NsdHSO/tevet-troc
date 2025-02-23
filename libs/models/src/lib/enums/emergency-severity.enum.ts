export enum EmergencySeverity {
  LOW = 'LOW', // Minor injury or discomfort, no immediate danger
  MEDIUM = 'MEDIUM', // Requires attention but not life-threatening
  HIGH = 'HIGH', // Serious emergency needing fast response
  CRITICAL = 'CRITICAL', // Life-threatening situation
  SEVERE = 'SEVERE', // Mass casualty or widespread crisis
  EXTREME = 'EXTREME', // Catastrophic emergency (e.g., natural disaster)
  UNKNOWN = 'UNKNOWN', // Severity is not yet determined

  /** Special Cases */
  STABLE = 'STABLE', // Condition is under control, but still being monitored
  UNSTABLE = 'UNSTABLE', // Condition is deteriorating, requiring urgent care
  DECEASED = 'DECEASED', // Fatality recorded in the emergency case
}
