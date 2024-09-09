import sendEditEvent from '~utils/event/sendEditEvent'

function ImagePlaceholder() {
  return (
    <div
      onClick={() => sendEditEvent('about')}
      className="dfr-p-4 dfr-aspect-[3/4] dfr-bg-neutral-50 dark:dfr-bg-neutral-800 dfr-text-neutral-300 dark:dfr-text-neutral-500 dfr-flex dfr-items-center dfr-justify-center dfr-text-4xl dfr-font-semibold dfr-cursor-pointer"
    >
      Image
    </div>
  )
}

export default ImagePlaceholder
