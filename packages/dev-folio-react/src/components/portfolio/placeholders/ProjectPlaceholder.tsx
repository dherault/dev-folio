import sendEditEvent from '~utils/event/sendEditEvent'

function ProjectPlaceholder() {
  return (
    <div
      className="dfr-bg-neutral-50 dark:dfr-bg-neutral-800 dfr-text-neutral-300 dark:dfr-text-neutral-500 dfr-cursor-pointer"
      onClick={() => sendEditEvent('projects')}
    >
      <div className="dfr-w-full dfr-aspect-[120/63]" />
      <div className="dfr-py-2 dfr-pl-4 dfr-shrink dfr-truncate dfr-text-lg dfr-font-semibold">
        Project
      </div>
    </div>
  )
}

export default ProjectPlaceholder
