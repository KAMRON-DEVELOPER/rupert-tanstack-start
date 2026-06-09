import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateApi } from '@/api/api'
import type { MessageResponse } from '@/types/shared/types'
import { uploadAttachmentsResponseSchema } from '@/types/shared/attachment'

export const useUploadAttachmentsMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))

      const data = await api('attachments/', {
        method: 'POST',
        data: formData
      })

      const result = uploadAttachmentsResponseSchema.safeParse(data)

      if (!result.success) {
        console.error(
          '[uploadAttachmentsResponseSchema] parse failed:',
          result.error.message
        )
        throw new Error(
          '[uploadAttachmentsResponseSchema] Unexpected response shape from backend'
        )
      }

      return result.data
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
