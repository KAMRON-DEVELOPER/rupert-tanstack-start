import { Button } from '@/components/ui/button'
import type { ComponentProps } from 'react'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  isPending: boolean
  pendingText?: string
}

const SubmitButton = ({
  children,
  isPending,
  pendingText = 'Saving...',
  disabled,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={disabled || isPending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  )
}

export default SubmitButton
