import { useEffect } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorSectionSelect from '~components/portfolio/editor/PortfolioEditorSectionSelect'
import PortfolioEditorAbout from '~components/portfolio/editor/PortfolioEditorAbout'
import PortfolioEditorTechnologies from '~components/portfolio/editor/PortfolioEditorTechnologies'
import PortfolioEditorProjects from '~components/portfolio/editor/PortfolioEditorProjects'
import PortfolioEditorContact from '~components/portfolio/editor/PortfolioEditorContact'

function PortfolioEditor() {
  const { editedSection, setEditedSection, setEdited } = usePortfolio()

  useEffect(() => {
    function handler(event: CustomEvent) {
      setEditedSection(event.detail)
      setEdited(true)
    }

    window.addEventListener('edit', handler as EventListener)

    return () => {
      window.removeEventListener('edit', handler as EventListener)
    }
  }, [
    setEditedSection,
    setEdited,
  ])

  return (
    <div className="h-full w-[512px] border bg-white dark:bg-neutral-900 flex flex-col">
      <div className="pt-4 px-4">
        <PortfolioEditorSectionSelect />
      </div>
      <div className="pt-4 grow overflow-y-auto">
        <div className="p-4">
          {editedSection === 'about' && <PortfolioEditorAbout />}
          {editedSection === 'technologies' && <PortfolioEditorTechnologies />}
          {editedSection === 'projects' && <PortfolioEditorProjects />}
          {editedSection === 'contact' && <PortfolioEditorContact />}
        </div>
      </div>
    </div>
  )
}

export default PortfolioEditor
