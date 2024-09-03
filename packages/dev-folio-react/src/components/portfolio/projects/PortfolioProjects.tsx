import usePortfolio from '~hooks/portfolio/usePortfolio'

import ProjectCard from '~components/portfolio/projects/ProjectCard'
import ProjectPlaceholder from '~components/portfolio/projects/ProjectPlaceholder'

function PortfolioProjects() {
  const { portfolio, isDev } = usePortfolio()

  if (!portfolio.sections.includes('projects')) return null

  return (
    <section className="dfr-py-16 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Projects
      </h2>
      <div className="dfr-mt-8 dfr-grid dfr-grid-cols-2 dfr-auto-rows-fr dfr-gap-8">
        {portfolio.projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
        {!portfolio.projects.length && isDev && (
          <>
            <ProjectPlaceholder />
            <ProjectPlaceholder />
          </>
        )}
      </div>
    </section>
  )
}

export default PortfolioProjects
