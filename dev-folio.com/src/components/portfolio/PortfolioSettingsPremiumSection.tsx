import type { PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

function PortfolioSettingsPremiumSection({ children }: PropsWithChildren) {
  const { user } = useUser()

  return (
    <section className="relative">
      {!user?.isPremium && (
        <div className="absolute inset-0 bg-white/50" />
      )}
      {children}
    </section>
  )
}

export default PortfolioSettingsPremiumSection
