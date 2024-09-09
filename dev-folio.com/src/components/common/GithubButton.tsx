import GitHubButton from 'react-github-btn'

import useTheme from '~hooks/ui/useTheme'

function GithubButton() {
  const { theme } = useTheme()

  return (
    <GitHubButton
      href="https://github.com/dherault/dev-folio"
      data-color-scheme={`no-preference: ${theme}; light: ${theme}; dark: ${theme};`}
      data-icon="octicon-star"
      data-size="large"
      data-show-count="true"
      aria-label="Star dherault/dev-folio on GitHub"
    >
      Star
    </GitHubButton>
  )
}

export default GithubButton
