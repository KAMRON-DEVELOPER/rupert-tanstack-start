import { ErrorResponse } from '@/types/types';

export function isErrorResponse(data: unknown): data is ErrorResponse {
  return typeof data === 'object' && data !== null && 'error' in data && typeof (data as ErrorResponse).error === 'string';
}
