import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorHero from '~components/portfolio/editor/PortfolioEditorHero'
import PortfolioEditorSectionSelect from '~components/portfolio/editor/PortfolioEditorSectionSelect'

function PortfolioEditor() {
  const { editedSection } = usePortfolio()

  return (
    <div className="p-4 h-full w-[512px] border bg-white flex flex-col">
      <PortfolioEditorSectionSelect />
      <div className="pt-4 grow overflow-y-auto">
        {editedSection === 'hero' && <PortfolioEditorHero />}
      </div>
    </div>
  )
}

export default PortfolioEditor
