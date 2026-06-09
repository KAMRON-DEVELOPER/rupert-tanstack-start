import { createServerFn } from '@tanstack/react-start'
import { createServerApi } from '../api.server'
import { skillRequestSchema, skillResponseSchema } from '@/types/shared/skill'
import z from 'zod'

export const createSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema)
  .handler(async ({ data }) => {
    const api = createServerApi()

    const response = await api('admin/skills', {
      method: 'POST',
      data
    })

    const result = skillResponseSchema.safeParse(response)

    if (!result.success) {
      console.error('[skillResponseSchema] parse failed:', result.error.message)
      throw new Error(
        '[skillResponseSchema] Unexpected response shape from backend'
      )
    }

    return result.data
  })

export const updateSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(skillRequestSchema.extend({ skillId: z.uuid() }))
  .handler(async ({ data: { name, skillId } }) => {
    const api = createServerApi()

    await api(`admin/skills/${skillId}`, {
      method: 'PATCH',
      data: { name }
    })
  })

export const deleteSkillFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ skillId: z.uuid() }))
  .handler(async ({ data: { skillId } }) => {
    const api = createServerApi()

    await api(`admin/skills/${skillId}`, {
      method: 'DELETE'
    })
  })
