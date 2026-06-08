import {
  FollowPolicyList,
  JobSearchStatusList,
  SpecializationList
} from '@/types/shared/literals'
import { baseSchema } from '@/types/shared/base'
import z from 'zod'

import { FollowStatusList } from '@/types/shared/literals'
import { uuid } from '@/types/shared/primitives'

const followUpdateRequestSchema = z.object({
  status: z.enum(FollowStatusList)
})

const followUserResponseSchema = baseSchema.extend({
  firstName: z.string(),
  lastName: z.string().optional(),
  headline: z.string().optional(),
  avatarUrl: z.string().optional(),
  specialization: z.enum(SpecializationList).optional(),
  followPolicy: z.enum(FollowPolicyList),
  jobSearchStatus: z.enum(JobSearchStatusList),
  followersCount: z.number().int(),
  followingsCount: z.number().int()
})

const followResponseSchema = baseSchema.extend({
  followerId: uuid,
  followingId: uuid,
  status: z.enum(FollowStatusList),
  follower: followUserResponseSchema.optional(),
  following: followUserResponseSchema.optional()
})

export type FollowUpdateRequest = z.infer<typeof followUpdateRequestSchema>
export type FollowUserResponse = z.infer<typeof followUserResponseSchema>
export type FollowResponse = z.infer<typeof followResponseSchema>
