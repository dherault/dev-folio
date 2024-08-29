type Props = {
  label: string
}

function TextPlaceholder({ label }: Props) {
  return (
    <span className="py-1 px-2 bg-neutral-50 text-neutral-300">
      {label}
    </span>
  )
}

export default TextPlaceholder
