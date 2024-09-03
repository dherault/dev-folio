import usePortfolio from '~hooks/portfolio/usePortfolio'

import ProjectCard from '~components/portfolio/projects/ProjectCard'

function PortfolioProjects() {
  const { portfolio } = usePortfolio()

  if (!portfolio.sections.includes('projects')) return null

  console.log('portfolio', portfolio)

  return (
    <section className="dfr-py-8 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Projects
      </h2>
      <div className="dfr-mt-8 dfr-grid dfr-grid-cols-2 dfr-gap-8">
        {portfolio.projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}

export default PortfolioProjects
