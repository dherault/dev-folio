import sendEditEvent from '~utils/event/sendEditEvent'

function TechnologyPlaceholder() {
  return (
    <div
      onClick={() => sendEditEvent('technologies')}
      className="dfr-bg-neutral-50 dfr-text-neutral-300 dfr-text-xs dfr-font-semibold dfr-aspect-square dfr-flex dfr-items-center dfr-justify-center dfr-cursor-pointer"
    >
      Technology
    </div>
  )
}

export default TechnologyPlaceholder
