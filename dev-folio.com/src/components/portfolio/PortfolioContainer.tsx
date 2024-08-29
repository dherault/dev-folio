import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import _ from 'clsx'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditor from '~components/portfolio/editor/PortfolioEditor'

function PortfolioContainer({ children }: PropsWithChildren) {
  const { edited } = usePortfolio()

  return (
    <div className="relative grow overflow-hidden bg-neutral-background">
      <motion.div
        initial="close"
        animate={edited ? 'open' : 'close'}
        variants={{
          open: {
            left: 32,
            transition: {
              ease: 'easeInOut',
            },
          },
          close: {
            left: '-100%',
            transition: {
              ease: 'easeInOut',
            },
          },
        }}
        className="absolute top-8 bottom-8 z-20"
      >
        <PortfolioEditor />
      </motion.div>
      <motion.div
        initial="close"
        animate={edited ? 'open' : 'close'}
        variants={{
          open: {
            scale: 0.5,
            right: -256,
            transition: {
              ease: 'easeInOut',
            },
          },
          close: {
            scale: 1,
            right: 0,
            transition: {
              ease: 'easeInOut',
            },
          },
        }}
        className="absolute top-0 z-10"
      >
        <div
          className={_('max-w-[1400px] bg-white border transition-colors', {
            'border-transparent': !edited,
          })}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default PortfolioContainer
