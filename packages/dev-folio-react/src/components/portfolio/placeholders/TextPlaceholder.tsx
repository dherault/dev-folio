import sendEditEvent from '~utils/event/sendEditEvent'

type Props = {
  label: string
  editSection: string
}

function TextPlaceholder({ label, editSection }: Props) {
  return (
    <span
      onClick={() => sendEditEvent(editSection)}
      className="dfr-py-1 dfr-px-2 dfr-bg-neutral-50 dfr-text-neutral-300 dfr-cursor-pointer"
    >
      {label}
    </span>
  )
}

export default TextPlaceholder
