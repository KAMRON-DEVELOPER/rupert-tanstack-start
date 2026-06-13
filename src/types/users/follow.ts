import {
  FollowPolicyList,
  JobSearchStatusList,
  SpecializationList
} from '@/types/shared/literals'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'

import { FollowStatusList } from '@/types/shared/literals'
import { uuid } from '@/types/shared/primitives'

export const followUpdateRequestSchema = z.object({
  status: z.enum(FollowStatusList)
})

export const followUserResponseSchema = baseSchema.extend({
  firstName: z.string(),
  lastName: z.string().nullish(),
  headline: z.string().nullish(),
  avatarUrl: z.string().nullish(),
  specialization: z.enum(SpecializationList).nullish(),
  followPolicy: z.enum(FollowPolicyList),
  jobSearchStatus: z.enum(JobSearchStatusList),
  followersCount: z.number().int(),
  followingsCount: z.number().int()
})

export const followResponseSchema = baseSchema.extend({
  followerId: uuid,
  followingId: uuid,
  status: z.enum(FollowStatusList),
  follower: followUserResponseSchema.nullish(),
  following: followUserResponseSchema.nullish()
})

export type FollowUpdateRequest = z.infer<typeof followUpdateRequestSchema>
export type FollowUserResponse = z.infer<typeof followUserResponseSchema>
export type FollowResponse = z.infer<typeof followResponseSchema>
