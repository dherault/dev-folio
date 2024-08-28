import 'dev-folio-react/dist/style.css'
import './index.css'

import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from 'dev-folio-react'

createRoot(document.getElementById('root')!).render(
  <PortfolioProvider>
    Foo
  </PortfolioProvider>
)
