import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '~utils/ui'

import Spinner from '~components/common/Spinner'

const buttonVariants = cva(
  'tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors focus-visible:tw-outline-none disabled:tw-pointer-events-none disabled:tw-opacity-50',
  {
    variants: {
      variant: {
        default: 'tw-bg-blue-500 tw-text-white hover:tw-bg-blue-500/90 dark:tw-bg-neutral-50 dark:tw-text-neutral-900 dark:tw-hover:bg-neutral-50/90',
        destructive: 'tw-bg-red-500 tw-text-neutral-50 hover:tw-bg-red-500/90 dark:tw-bg-red-900 dark:tw-text-neutral-50 dark:tw-hover:bg-red-900/90',
        outline: 'tw-border tw-border-neutral-200 tw-bg-white hover:tw-bg-neutral-50 hover:tw-text-neutral-900 dark:tw-border-neutral-800 dark:tw-bg-neutral-950 dark:hover:tw-bg-neutral-800 dark:hover:tw-text-neutral-50',
        secondary: 'tw-bg-neutral-100 tw-text-neutral-900 hover:tw-bg-neutral-100/80 dark:tw-bg-neutral-800 dark:tw-text-neutral-50 dark:hover:tw-bg-neutral-800/80',
        ghost: 'hover:tw-bg-neutral-100 hover:tw-text-neutral-900 dark:hover:tw-bg-neutral-800 dark:hover:tw-text-neutral-50',
      },
      size: {
        default: 'tw-h-10 tw-ptw-4 tw-py-2',
        lg: 'tw-h-11 tw-rounded-md tw-ptw-8',
        xl: 'tw-h-14 tw-rounded-md tw-ptw-12 tw-text-xl',
        icon: 'tw-h-10 tw-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <>
            <Spinner className="tw-inline tw-w-4 tw-mr-3" />
            Loading...
          </>
        )}
        {!loading && children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
