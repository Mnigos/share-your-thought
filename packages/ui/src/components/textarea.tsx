import * as React from 'react'

import { cn } from '@repo/ui/utils'

namespace Textarea {
  export type Props = Readonly<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
  >
}

// eslint-disable-next-line sonarjs/no-redeclare
const Textarea = React.forwardRef<HTMLTextAreaElement, Textarea.Props>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-sm bg-transparent p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
