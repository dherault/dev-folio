import usePortfolio from '~hooks/portfolio/usePortfolio'

import TextPlaceholder from '~components/portfolio/TextPlaceholder'

function PortfolioHero() {
  const { portfolio } = usePortfolio()

  return (
    <section className="tw-container tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-1/2">
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
      <div className="tw-w-1/2 tw-flex tw-items-center tw-justify-center">
        <img
          src="https://images.pexels.com/photos/27514901/pexels-photo-27514901/free-photo-of-woman-in-hat-sitting-with-hand-on-cheek.jpeg"
          className="tw-w-[80%] tw-aspect-[3/4] tw-object-cover"
        />
      </div>
    </section>
  )
}

export default PortfolioHero
