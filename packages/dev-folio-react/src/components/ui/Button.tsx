import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '~utils/ui'

import Spinner from '~components/common/Spinner'

const buttonVariants = cva(
  'dfr-flex dfr-items-center dfr-justify-center dfr-whitespace-nowrap dfr-rounded-md dfr-text-sm dfr-font-medium dfr-transition-colors focus-visible:dfr-outline-none disabled:dfr-pointer-events-none disabled:dfr-opacity-50',
  {
    variants: {
      variant: {
        default: 'dfr-bg-blue-500 dfr-text-white hover:dfr-bg-blue-500/90 dark:dfr-bg-neutral-50 dark:dfr-text-neutral-900 dark:dfr-hover:bg-neutral-50/90',
        destructive: 'dfr-bg-red-500 dfr-text-neutral-50 hover:dfr-bg-red-500/90 dark:dfr-bg-red-900 dark:dfr-text-neutral-50 dark:dfr-hover:bg-red-900/90',
        outline: 'dfr-border dfr-border-neutral-200 dfr-bg-white hover:dfr-bg-neutral-50 hover:dfr-text-neutral-900 dark:dfr-border-neutral-800 dark:dfr-bg-neutral-950 dark:hover:dfr-bg-neutral-800 dark:hover:dfr-text-neutral-50',
        secondary: 'dfr-bg-neutral-100 dfr-text-neutral-900 hover:dfr-bg-neutral-100/80 dark:dfr-bg-neutral-800 dark:dfr-text-neutral-50 dark:hover:dfr-bg-neutral-800/80',
        ghost: 'hover:dfr-bg-neutral-100 hover:dfr-text-neutral-900 dark:hover:dfr-bg-neutral-800 dark:hover:dfr-text-neutral-50',
      },
      size: {
        default: 'dfr-h-10 dfr-pdfr-4 dfr-py-2',
        lg: 'dfr-h-11 dfr-rounded-md dfr-pdfr-8',
        xl: 'dfr-h-14 dfr-rounded-md dfr-pdfr-12 dfr-text-xl',
        icon: 'dfr-h-10 dfr-w-10',
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
            <Spinner className="dfr-inline dfr-w-4 dfr-mr-3" />
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
