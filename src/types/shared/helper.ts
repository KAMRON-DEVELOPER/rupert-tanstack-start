import { ErrorResponse, errorResponseSchema } from '@/types/shared/types'

export function isErrorResponse(data: unknown): data is ErrorResponse {
  return errorResponseSchema.safeParse(data).success
}

export function getErrorMessage(
  data: unknown,
  fallback = 'Something went wrong'
) {
  if (!isErrorResponse(data)) return fallback

  return Array.isArray(data.details) ? data.details.join('\n') : data.details
}

export function snakeToCamelObj(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, l) => l.toUpperCase())
    result[camelKey] = value
  }
  return result
}
