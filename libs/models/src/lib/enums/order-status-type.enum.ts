/**
 * @description Represents the status of an order.
 */
export enum OrderStatus {
  /** @description Order is pending. */
  PENDING = 'PENDING',
  /** @description Order is being processed. */
  PROCESSING = 'PROCESSING',
  /** @description Order has been shipped. */
  SHIPPED = 'SHIPPED',
  /** @description Order has been received. */
  RECEIVED = 'RECEIVED',
  /** @description Order is cancelled. */
  CANCELLED = 'CANCELLED',
}
