import { Alert, AlertDescription } from '@/components/ui/alert'

interface FormErrorProps {
  message: string | null
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <Alert variant="destructive">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default FormError
