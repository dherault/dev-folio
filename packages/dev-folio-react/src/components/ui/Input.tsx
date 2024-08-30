import * as React from 'react'

import { cn } from '~utils/ui'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'dfr-flex dfr-h-10 dfr-w-full dfr-rounded-md dfr-border dfr-border-neutral-200 dfr-bg-white dfr-px-3 dfr-py-2 dfr-text-sm file:dfr-border-0 file:dfr-bg-transparent file:dfr-text-sm file:dfr-font-medium placeholder:dfr-text-neutral-500 focus-visible:dfr-border-blue disabled:dfr-cursor-not-allowed disabled:dfr-opacity-50 dark:dfr-border-neutral-800 dark:dfr-bg-neutral-950 dark:placeholder:dfr-text-neutral-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
