interface EmptyStateProps {
  title: string
  description?: string
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-lg border border-dashed p-4 text-sm">
      <p className="font-medium">{title}</p>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}

export default EmptyState
