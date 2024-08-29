type Props = {
  label: string
}

function TextPlaceholder({ label }: Props) {
  return (
    <span className="tw-py-1 tw-ptw-2 tw-bg-neutral-50 tw-text-neutral-300">
      {label}
    </span>
  )
}

export default TextPlaceholder
