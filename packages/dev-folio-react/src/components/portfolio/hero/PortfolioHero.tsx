import usePortfolio from '~hooks/portfolio/usePortfolio'

import TextPlaceholder from '~components/portfolio/hero/TextPlaceholder'
import ImagePlaceholder from '~components/portfolio/hero/ImagePlaceholder'

function PortfolioHero() {
  const { portfolio } = usePortfolio()

  return (
    <section className="tw-container tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-gap-16">
      <div className="-tw-mt-8 tw-w-[40%] tw-tracking-tighte">
        <h1 className="tw-text-4xl tw-font-semibold">
          {portfolio.heroEmoji ? <span className="tw-mr-3">{portfolio.heroEmoji}</span> : ''}
          Hi, I'm
          {' '}
          {portfolio.name || <TextPlaceholder label="Name" />}
        </h1>
        <div className="tw-mt-4 tw-text-4xl tw-font-semibold">
          {portfolio.heroDescription || <TextPlaceholder label="Description" />}
        </div>
      </div>
      <div className="tw-w-[40%]">
        {!!portfolio.heroImageUrl && (
          <img
            src={portfolio.heroImageUrl}
            className="tw-aspect-[3/4] tw-object-cover"
          />
        )}
        {!portfolio.heroImageUrl && (
          <ImagePlaceholder />
        )}
      </div>
    </section>
  )
}

export default PortfolioHero
