import sendEditEvent from '~utils/event/sendEditEvent'

function ImagePlaceholder() {
  return (
    <div
      onClick={() => sendEditEvent('about')}
      className="dfr-p-4 dfr-aspect-[3/4] dfr-bg-neutral-50 dfr-text-neutral-300 dfr-flex dfr-items-center dfr-justify-center dfr-text-4xl dfr-font-semibold dfr-cursor-pointer"
    >
      Image
    </div>
  )
}

export default ImagePlaceholder
