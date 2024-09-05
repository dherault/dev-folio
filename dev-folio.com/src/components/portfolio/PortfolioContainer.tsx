import { type PropsWithChildren, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import _ from 'clsx'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useWindowSize from '~hooks/common/useWindowSize'
import useRefreshWithDependencies from '~hooks/common/useRefreshWithDependencies'
import usePrevious from '~hooks/common/usePrevious'

import PortfolioEditor from '~components/portfolio/editor/PortfolioEditor'

const CONTENT_WIDTH = 1400
const NAVBAR_HEIGHT = 58

function PortfolioContainer({ children }: PropsWithChildren) {
  const contentRef = useRef<HTMLDivElement>(null)

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const { edited, editedSection, debouncedEdited } = usePortfolio()
  const initialEdited = useRef(edited).current
  const previousEdited = usePrevious(debouncedEdited)

  useRefreshWithDependencies([children], 300)

  const top = 32
  const bottom = 32
  const left = 512 + 2 * 32
  const right = 32
  const scale = Math.min((windowWidth - left - right) / CONTENT_WIDTH, (windowHeight - NAVBAR_HEIGHT - top - bottom) / (contentRef.current?.clientHeight ?? 0))
  const marginTop = contentRef.current?.clientHeight ? (windowHeight - NAVBAR_HEIGHT - contentRef.current.clientHeight * scale) / 2 : 0

  // Scroll to edited section
  useEffect(() => {
    if (!contentRef.current) return
    if (debouncedEdited || !previousEdited) return

    const element = document.getElementById(editedSection)

    if (!element) return

    contentRef.current.scrollTop = element.offsetTop
  }, [
    debouncedEdited,
    previousEdited,
    editedSection,
  ])

  return (
    <div
      className={_('relative grow transition-colors duration-300 overflow-hidden', {
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
        className="absolute top-8 bottom-8 hidden md:block z-20"
      >
        <PortfolioEditor />
      </motion.div>
      <motion.div
        initial={initialEdited ? 'open' : 'close'}
        animate={edited ? 'open' : 'close'}
        variants={{
          open: {
            scale,
            left,
            marginTop,
            width: CONTENT_WIDTH,
            transition: {
              ease: 'easeInOut',
            },
          },
          close: {
            scale: 1,
            left: 0,
            marginTop: 0,
            width: windowWidth,
            transition: {
              ease: 'easeInOut',
            },
          },
        }}
        className="origin-top-left absolute top-0 bottom-0 right-0 z-10"
      >
        <div
          ref={contentRef}
          className="bg-white border overflow-y-auto transition-colors duration-300"
          style={{
            height: debouncedEdited ? 'auto' : `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            borderColor: debouncedEdited ? '#e5e5e5' : 'transparent',
            borderWidth: debouncedEdited ? 1 : 0,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default PortfolioContainer
