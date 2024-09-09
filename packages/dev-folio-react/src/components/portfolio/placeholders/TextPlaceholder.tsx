import sendEditEvent from '~utils/event/sendEditEvent'

type Props = {
  label: string
  editSection: string
}

function TextPlaceholder({ label, editSection }: Props) {
  return (
    <span
      onClick={() => sendEditEvent(editSection)}
      className="dfr-py-1 dfr-px-2 dfr-bg-neutral-50 dark:dfr-bg-neutral-800 dfr-text-neutral-300 dark:dfr-text-neutral-500 dfr-cursor-pointer"
    >
      {label}
    </span>
  )
}

export default TextPlaceholder
