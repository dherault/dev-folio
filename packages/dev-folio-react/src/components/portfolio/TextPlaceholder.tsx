type Props = {
  label: string
}

function TextPlaceholder({ label }: Props) {
  return (
    <span className="dfr-py-1 dfr-px-2 dfr-bg-neutral-50 dfr-text-neutral-300">
      {label}
    </span>
  )
}

export default TextPlaceholder
