import sendEditEvent from '~utils/event/sendEditEvent'

function ProjectPlaceholder() {
  return (
    <div
      className="dfr-bg-neutral-50 dfr-cursor-pointer"
      onClick={() => sendEditEvent('projects')}
    >
      <div className="dfr-w-full dfr-aspect-[120/63]" />
      <div className="dfr-py-2 dfr-pl-4 dfr-shrink dfr-truncate dfr-text-lg dfr-font-semibold dfr-text-neutral-300">
        Project
      </div>
    </div>
  )
}

export default ProjectPlaceholder
