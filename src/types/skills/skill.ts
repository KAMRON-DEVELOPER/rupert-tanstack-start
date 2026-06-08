import z from 'zod'
import { uuid, isoDateTime } from '@/types/shared/primitives'
import { listResponseSchema } from '@/types/shared/types'

export const skillResponseSchema = z
  .object({
    id: uuid,
    created_at: isoDateTime,
    updated_at: isoDateTime,
    name: z.string()
  })
  .transform(({ created_at, updated_at, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at
  }))

export const skillListResponseSchema = listResponseSchema(skillResponseSchema)

export type SkillResponse = z.infer<typeof skillResponseSchema>
