import usePortfolio from '~hooks/portfolio/usePortfolio'

import TextPlaceholder from '~components/portfolio/placeholders/TextPlaceholder'

function PortfolioContact() {
  const { portfolio, isDev } = usePortfolio()

  if (!portfolio.sections.includes('contact')) return null
  if (!isDev && !portfolio.email) return null

  return (
    <section className="dfr-py-16 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Contact
      </h2>
      <div className="dfr-mt-8 dfr-text-lg">
        You can contact me at
        {' '}
        {portfolio.email || isDev && (
          <TextPlaceholder
            editSection="contact"
            label="Email"
          />
        )}
      </div>
    </section>
  )
}

export default PortfolioContact
