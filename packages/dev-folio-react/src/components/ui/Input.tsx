import * as React from 'react'

import { cn } from '~utils/ui'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-neutral-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-neutral-500 focus-visible:tw-border-blue disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-neutral-800 dark:tw-bg-neutral-950 dark:placeholder:tw-text-neutral-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
