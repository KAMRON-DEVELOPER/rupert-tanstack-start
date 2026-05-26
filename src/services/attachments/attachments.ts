import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateApi } from '@/services/api'
import {
  uploadAttachmentsResponseSchema,
  type UploadAttachmentsResponse
} from '@/types/attachment.schema'
import type { MessageResponse } from '@/types/types'

export const useUploadAttachmentsMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))

      const data = await api<unknown>('attachments/', {
        method: 'POST',
        data: formData
      })

      return uploadAttachmentsResponseSchema.parse(
        data
      ) satisfies UploadAttachmentsResponse
    }
  })
}

export const useDeleteAttachmentsMutation = (api: CreateApi) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) =>
      api<MessageResponse>('attachments/', { method: 'DELETE', data: ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments'] })
    }
  })
}
