import z from 'zod'

export const skillResponseSchema = z.object({
  name: z.string()
})

export const skillListResponseSchema = z.object({
  data: z.array(skillResponseSchema),
  total: z.number()
})

export type SkillSchema = z.infer<typeof skillResponseSchema>
