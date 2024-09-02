import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorSectionSelect from '~components/portfolio/editor/PortfolioEditorSectionSelect'
import PortfolioEditorAbout from '~components/portfolio/editor/PortfolioEditorAbout'
import PortfolioEditorTechnologies from '~components/portfolio/editor/PortfolioEditorTechnologies'
import PortfolioEditorProjects from '~components/portfolio/editor/PortfolioEditorProjects'

function PortfolioEditor() {
  const { editedSection } = usePortfolio()

  return (
    <div className="p-4 h-full w-[512px] border bg-white flex flex-col">
      <PortfolioEditorSectionSelect />
      <div className="pt-4 grow overflow-y-auto">
        {editedSection === 'about' && <PortfolioEditorAbout />}
        {editedSection === 'technologies' && <PortfolioEditorTechnologies />}
        {editedSection === 'projects' && <PortfolioEditorProjects />}
      </div>
    </div>
  )
}

export default PortfolioEditor
