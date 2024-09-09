import { type PropsWithChildren } from 'react'
import { Provider as WrapProvider } from 'react-wrap-balancer'

import { Toaster } from '~components/ui/Toaster'
import { TooltipProvider } from '~components/ui/Tooltip'
import ReferenceProvider from '~components/common/ReferenceProvider'
import AuthenticationProvider from '~components/authentication/AuthenticationProvider'
import { ThemeProvider } from '~components/ui/ThemeProvider'

function RootLayout({ children }: PropsWithChildren) {
  return (
    <WrapProvider>
      <ThemeProvider>
        <TooltipProvider>
          <ReferenceProvider>
            <AuthenticationProvider>
              {children}
              <Toaster />
            </AuthenticationProvider>
          </ReferenceProvider>
        </TooltipProvider>
      </ThemeProvider>
    </WrapProvider>
  )
}

export default RootLayout
