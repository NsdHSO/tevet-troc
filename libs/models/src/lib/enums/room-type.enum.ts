/**
 * @description Represents the type of a room.
 */
export enum Room {
  /** @description A single occupancy room. */
  SINGLE = 'SINGLE',
  /** @description A double occupancy room. */
  DOUBLE = 'DOUBLE',
  /** @description A suite room. */
  SUITE = 'SUITE',
  /** @description An intensive care unit room. */
  ICU = 'ICU',
  /** @description An emergency room. */
  EMERGENCY = 'EMERGENCY',
  /** @description A pediatric room. */
  PEDIATRIC = 'PEDIATRIC',
  /** @description A maternity room. */
  MATERNITY = 'MATERNITY',
  /** @description A surgical room. */
  SURGICAL = 'SURGICAL',
  /** @description A recovery room. */
  RECOVERY = 'RECOVERY',
  /** @description An isolation room. */
  ISOLATION = 'ISOLATION',
}
