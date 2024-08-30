import usePortfolio from '~hooks/portfolio/usePortfolio'

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
        <SelectItem value="hero">
          Hero
        </SelectItem>
        <SelectItem value="skills">
          Skills
        </SelectItem>
        <SelectItem value="projects">
          Projects
        </SelectItem>
        <SelectItem value="contact">
          Contact
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PortfolioEditorSectionSelect
