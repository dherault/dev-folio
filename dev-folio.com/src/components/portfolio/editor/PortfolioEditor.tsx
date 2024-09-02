import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorSectionSelect from '~components/portfolio/editor/PortfolioEditorSectionSelect'
import PortfolioEditorHero from '~components/portfolio/editor/hero/PortfolioEditorHero'
import PortfolioEditorSkills from '~components/portfolio/editor/skills/PortfolioEditorSkills'

function PortfolioEditor() {
  const { editedSection } = usePortfolio()

  return (
    <div className="p-4 h-full w-[512px] border bg-white flex flex-col">
      <PortfolioEditorSectionSelect />
      <div className="pt-4 grow overflow-y-auto">
        {editedSection === 'hero' && <PortfolioEditorHero />}
        {editedSection === 'skills' && <PortfolioEditorSkills />}
      </div>
    </div>
  )
}

export default PortfolioEditor
