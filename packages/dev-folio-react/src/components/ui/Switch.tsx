import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '~utils/ui'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'dfr-peer dfr-inline-flex dfr-h-6 dfr-w-11 dfr-shrink-0 dfr-cursor-pointer dfr-items-center dfr-rounded-full dfr-border-2 dfr-border-transparent dfr-transition-colors focus-visible:dfr-outline-none focus-visible:dfr-ring-2 focus-visible:dfr-ring-neutral-950 focus-visible:dfr-ring-offset-2 focus-visible:dfr-ring-offset-white disabled:dfr-cursor-not-allowed disabled:dfr-opacity-50 data-[state=checked]:dfr-bg-neutral-900 data-[state=unchecked]:dfr-bg-neutral-200 dark:focus-visible:dfr-ring-neutral-300 dark:dfr-focus-visible:dfr-ring-offset-neutral-950 dark:data-[state=checked]:dfr-bg-neutral-50 dark:data-[state=unchecked]:dfr-bg-neutral-800',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'dfr-pointer-events-none dfr-block dfr-h-5 dfr-w-5 dfr-rounded-full dfr-bg-white dfr-shadow-lg dfr-ring-0 dfr-transition-transform data-[state=checked]:dfr-translate-dfr-5 data-[state=unchecked]:dfr-translate-dfr-0 dark:dfr-bg-neutral-950'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
