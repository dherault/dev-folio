import usePortfolio from '~hooks/portfolio/usePortfolio'

import TextPlaceholder from '~components/portfolio/TextPlaceholder'

function PortfolioHero() {
  const { portfolio } = usePortfolio()

  return (
    <section className="container min-h-screen flex items-center justify-center">
      <div className="w-1/2">
        <h1 className="text-4xl font-semibold">
          Hi, I'm
          {' '}
          {portfolio.name || <TextPlaceholder label="Name" />}
        </h1>
        <div className="mt-4 text-4xl font-semibold">
          I'm a full stack developer based in San Fransico, CA. I specialize in MVP development and rapid prototyping.
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/27514901/pexels-photo-27514901/free-photo-of-woman-in-hat-sitting-with-hand-on-cheek.jpeg"
          className="w-[80%] aspect-[3/4] object-cover"
        />
      </div>
    </section>
  )
}

export default PortfolioHero
