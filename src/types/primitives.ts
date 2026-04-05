export type UUID = string;

/**
 * Money / rates coming from BigDecimal.
 * Always serialized as string by the backend.
 *
 * NEVER use number for money.
 */
export type DecimalString = string;

/**
 * ISO-8601 timestamp, UTC (from chrono::DateTime<Utc>)
 */
export type IsoDateTime = string;
