import z from 'zod'

export const uuid = z.uuid()
export const isoDateTime = z.iso.datetime({ offset: true })
export const isoDate = z.iso.date()

export type uuid = z.infer<typeof uuid>
export type isoDateTime = z.infer<typeof isoDateTime>
export type isoDate = z.infer<typeof isoDate>
