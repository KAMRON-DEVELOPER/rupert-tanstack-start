import z from 'zod'

export const skillResponseSchema = z.object({
  name: z.string()
})

export const skillListResponseSchema = z.array(skillResponseSchema)

export type SkillSchema = z.infer<typeof skillResponseSchema>
