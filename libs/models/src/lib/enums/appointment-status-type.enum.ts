/**
 * @description Represents the status of an appointment.
 */
export enum AppointmentStatus {
  /** @description Appointment is scheduled. */
  SCHEDULED = 'SCHEDULED',
  /** @description Appointment is confirmed. */
  CONFIRMED = 'CONFIRMED',
  /** @description Appointment is completed. */
  COMPLETED = 'COMPLETED',
  /** @description Appointment is cancelled. */
  CANCELLED = 'CANCELLED',
  /** @description Patient did not show up for the appointment. */
  NO_SHOW = 'NO_SHOW',
}
