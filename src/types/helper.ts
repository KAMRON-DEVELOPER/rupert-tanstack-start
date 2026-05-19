import { ErrorResponse } from '@/types/types'

export function isErrorResponse(data: unknown): data is ErrorResponse {
  if (typeof data !== 'object' || data === null || !('details' in data)) {
    return false
  }

  const details = data.details

  return (
    typeof details === 'string' ||
    (Array.isArray(details) &&
      details.every((item: unknown) => typeof item === 'string'))
  )
}

export function getErrorMessage(
  data: unknown,
  fallback = 'Something went wrong'
) {
  if (!isErrorResponse(data)) return fallback

  return Array.isArray(data.details) ? data.details.join('\n') : data.details
}
