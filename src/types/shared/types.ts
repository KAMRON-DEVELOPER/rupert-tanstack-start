import { IsoDateTime, UUID } from './primitives'

export interface ListResponse<T> {
  data: T[]
  total: number
}

export interface MessageResponse {
  message: string
}

export interface ErrorResponse {
  details: string | string[]
}

export interface Tag {
  name: string
}

export interface Id {
  id: UUID
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}
