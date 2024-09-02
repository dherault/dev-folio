import usePortfolio from '~hooks/portfolio/usePortfolio'

function PortfolioContact() {
  const { portfolio } = usePortfolio()

  if (!portfolio.sections.includes('projects')) return null

  return (
    <section className="dfr-container dfr-min-h-screen dfr-flex dfr-items-center dfr-justify-center">
      Contact
    </section>
  )
}

export default PortfolioContact
