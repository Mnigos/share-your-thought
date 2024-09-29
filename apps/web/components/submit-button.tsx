import { Button, type ButtonProps } from '@repo/ui/components/button'
import { cn } from '@repo/ui/utils'
import { LoaderCircle } from 'lucide-react'

namespace SubmitButton {
  export type Props = Readonly<
    Omit<ButtonProps, 'type'> & {
      pending: boolean
    }
  >
}

function SubmitButton({ pending, className, ...props }: SubmitButton.Props) {
  return (
    <Button type="submit" {...props} className={cn('gap-1', className)}>
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}

export { SubmitButton }
