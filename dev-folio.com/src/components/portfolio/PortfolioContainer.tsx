import { type PropsWithChildren, useRef } from 'react'
import { motion } from 'framer-motion'
import _ from 'clsx'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useWindowSize from '~hooks/common/useWindowSize'

import PortfolioEditor from '~components/portfolio/editor/PortfolioEditor'

function PortfolioContainer({ children }: PropsWithChildren) {
  const { edited } = usePortfolio()
  const initialEdited = useRef(edited)

  const { width: windowWidth } = useWindowSize()

  const contentWidth = windowWidth - 512 - 3 * 32
  const scale = windowWidth ? contentWidth / windowWidth : 1

  console.log('contentWidth/windowWidth', contentWidth, scale)

  return (
    <div className="relative grow overflow-x-hidden overflow-y-auto bg-neutral-background">
      <motion.div
        initial={initialEdited ? 'open' : 'close'}
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
        initial={initialEdited ? 'open' : 'close'}
        animate={edited ? 'open' : 'close'}
        variants={{
          open: {
            right: 32,
            transition: {
              ease: 'easeInOut',
            },
          },
          close: {
            right: 0,
            transition: {
              ease: 'easeInOut',
            },
          },
        }}
        className="absolute top-0 z-10"
      >
        <motion.div
          initial={initialEdited ? 'open' : 'close'}
          animate={edited ? 'open' : 'close'}
          variants={{
            open: {
              scale,
              transition: {
                ease: 'easeInOut',
              },
            },
            close: {
              scale: 1,
              transition: {
                ease: 'easeInOut',
              },
            },
          }}
          className="origin-right"
        >
          <div
            className={_('max-w-[1400px] bg-white border transition-colors', {
              'border-transparent': !edited,
            })}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
      <div
        style={{ width: contentWidth, marginLeft: 512 + 2 * 32 }}
        className="h-1 bg-neutral-200"
      />
    </div>
  )
}

export default PortfolioContainer
