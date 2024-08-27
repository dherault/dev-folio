import GitHubButton from 'react-github-btn'

function GithubButton() {
  return (
    <GitHubButton
      href="https://github.com/dherault/dev-folio"
      data-color-scheme="no-preference: light; light: light; dark: dark;"
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
