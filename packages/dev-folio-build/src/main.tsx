import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from 'dev-folio-react'

createRoot(document.getElementById('root')!).render(
  <PortfolioProvider>
    Foo
  </PortfolioProvider>
)
