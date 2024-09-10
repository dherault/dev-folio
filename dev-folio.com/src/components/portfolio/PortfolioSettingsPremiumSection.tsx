import type { PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

function PortfolioSettingsPremiumSection({ children }: PropsWithChildren) {
  const { isPremium } = useUser()

  return (
    <section className="relative">
      {!isPremium && (
        <div className="absolute inset-0 bg-white/50" />
      )}
      {children}
    </section>
  )
}

export default PortfolioSettingsPremiumSection
