/**
 * @description Represents the status of a payment.
 */
export enum PaymentStatus {
  /** @description Payment is pending. */
  PENDING = 'PENDING',
  /** @description Payment is partially completed. */
  PARTIAL = 'PARTIAL',
  /** @description Payment is completed. */
  COMPLETED = 'COMPLETED',
  /** @description Payment is refunded. */
  REFUNDED = 'REFUNDED',
}
