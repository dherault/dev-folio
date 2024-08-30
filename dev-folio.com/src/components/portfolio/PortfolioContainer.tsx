import { type PropsWithChildren, useRef } from 'react'
import { motion } from 'framer-motion'
import _ from 'clsx'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useWindowSize from '~hooks/common/useWindowSize'

import PortfolioEditor from '~components/portfolio/editor/PortfolioEditor'

const PORTFOLIO_WIDTH = 1400

function PortfolioContainer({ children }: PropsWithChildren) {
  const { edited } = usePortfolio()
  const initialEdited = useRef(edited).current

  const { width: windowWidth } = useWindowSize()

  const left = 512 + 2 * 32
  const right = 32
  const scale = (windowWidth - left - right) / PORTFOLIO_WIDTH

  return (
    <div
      className={_('relative grow overflow-x-hidden overflow-y-auto transition-colors duration-300', {
        'bg-neutral-background': edited,
        'bg-white': !edited,
      })}
    >
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
            left,
            transition: {
              ease: 'easeInOut',
            },
          },
          close: {
            left: 0,
            transition: {
              ease: 'easeInOut',
            },
          },
        }}
        className="absolute top-0 bottom-0 right-0 z-10"
      >
        <motion.div
          initial={initialEdited ? 'open' : 'close'}
          animate={edited ? 'open' : 'close'}
          variants={{
            open: {
              scale,
              width: PORTFOLIO_WIDTH,
              margin: 0,
              transition: {
                ease: 'easeInOut',
              },
            },
            close: {
              scale: 1,
              width: Math.min(windowWidth, PORTFOLIO_WIDTH),
              margin: '0 auto',
              transition: {
                ease: 'easeInOut',
              },
            },
          }}
          className="origin-left"
        >
          <motion.div
            initial={initialEdited ? 'open' : 'close'}
            animate={edited ? 'open' : 'close'}
            variants={{
              open: {
                width: PORTFOLIO_WIDTH,
                borderColor: '#e5e5e5',
                transition: {
                  ease: 'easeInOut',
                },
              },
              close: {
                width: Math.min(windowWidth, PORTFOLIO_WIDTH),
                borderColor: 'transparent',
                transition: {
                  ease: 'easeInOut',
                },
              },
            }}
            className="bg-white border"
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PortfolioContainer
