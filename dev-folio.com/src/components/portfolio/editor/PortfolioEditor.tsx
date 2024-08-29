import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorHero from '~components/portfolio/editor/PortfolioEditorHero'
import PortfolioEditorSectionSelect from '~components/portfolio/editor/PortfolioEditorSectionSelect'

function PortfolioEditor() {
  const { editedSection } = usePortfolio()

  return (
    <div className="h-full w-[512px] border bg-white">
      <div className="p-4">
        <PortfolioEditorSectionSelect />
      </div>
      {editedSection === 'hero' && <PortfolioEditorHero />}
    </div>
  )
}

export default PortfolioEditor
