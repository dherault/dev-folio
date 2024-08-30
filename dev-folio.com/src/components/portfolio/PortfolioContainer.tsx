import { type PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import _ from 'clsx'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useWindowSize from '~hooks/common/useWindowSize'

import PortfolioEditor from '~components/portfolio/editor/PortfolioEditor'

const PORTFOLIO_WIDTH = 1400

function PortfolioContainer({ children }: PropsWithChildren) {
  const { edited } = usePortfolio()

  const { width: windowWidth } = useWindowSize()

  const scale = (windowWidth - 512 - 3 * 32) / PORTFOLIO_WIDTH

  return (
    <div
      className={_('relative grow overflow-x-hidden overflow-y-auto transition-colors duration-300', {
        'bg-neutral-background': edited,
        'bg-white': !edited,
      })}
    >
      <motion.div
        animate={{
          left: edited ? 32 : '-100%',
          transition: {
            ease: 'easeInOut',
          },
        }}
        className="absolute top-8 bottom-8 -left-full z-20"
      >
        <PortfolioEditor />
      </motion.div>
      <motion.div
        animate={{
          right: edited ? 32 : 0,
          left: edited ? undefined : 0,
          transition: {
            ease: 'easeInOut',
          },
        }}
        className="absolute top-0 z-10"
      >
        <motion.div
          animate={{
            scale: edited ? scale : 1,
            transition: {
              ease: 'easeInOut',
            },
          }}
          className="origin-right"
        >
          <div
            className={_('mx-auto xl:w-[1400px] bg-white border transition-colors', {
              'border-transparent': !edited,
            })}
            style={{
              // width: edited ? PORTFOLIO_WIDTH : undefined,
              // maxWidth: PORTFOLIO_WIDTH,
            }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PortfolioContainer
