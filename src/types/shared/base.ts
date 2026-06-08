import z from 'zod'
import { uuid, isoDateTime } from './primitives'

export const baseSchema = z.object({
  id: uuid,
  createdAt: isoDateTime,
  updatedAt: isoDateTime
})
