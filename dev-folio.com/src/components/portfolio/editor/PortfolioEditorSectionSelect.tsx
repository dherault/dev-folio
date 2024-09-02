import { portfolioSections } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import capitalize from '~utils/string/capitalize'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~components/ui/Select'

function PortfolioEditorSectionSelect() {
  const { editedSection, setEditedSection } = usePortfolio()

  return (
    <Select
      value={editedSection}
      onValueChange={setEditedSection}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {portfolioSections.map(section => (
          <SelectItem
            key={section}
            value={section}
          >
            {capitalize(section)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PortfolioEditorSectionSelect
