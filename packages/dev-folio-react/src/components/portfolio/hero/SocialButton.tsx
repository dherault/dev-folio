import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  url: string
}>

function SocialButton({ url, children }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="dfr-w-10 dfr-h-10 dfr-rounded-full dfr-bg-neutral-900 hover:dfr-bg-neutral-700 dfr-text-white dfr-flex dfr-items-center dfr-justify-center"
    >
      {children}
    </a>
  )
}

export default SocialButton
