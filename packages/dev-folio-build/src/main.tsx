import 'dev-folio-react/dist/style.css'
import './index.css'

import { createRoot } from 'react-dom/client'
import { PortfolioLayout, PortfolioProvider } from 'dev-folio-react'

createRoot(document.getElementById('root')!).render(
  <PortfolioLayout>
    <PortfolioProvider>
      Foo
    </PortfolioProvider>
  </PortfolioLayout>
)
