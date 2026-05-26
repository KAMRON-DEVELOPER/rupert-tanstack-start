import { IsoDateTime, UUID } from './primitives'
import type { SkillSchema } from './skill.schema'

export interface Pagination {
  limit: number
  offset: number
}

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

export type Skill = SkillSchema

export interface Id {
  id: UUID
  createdAt: IsoDateTime
  updatedAt: IsoDateTime
}
