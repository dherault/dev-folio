import 'dev-folio-react/dist/style.css'
import './index.css'

import { createRoot } from 'react-dom/client'
import {
  PortfolioAbout,
  PortfolioContact,
  PortfolioFooter,
  PortfolioLayout,
  PortfolioProjects,
  PortfolioProvider,
  PortfolioTechnologies,
} from 'dev-folio-react'

createRoot(document.getElementById('root')!).render(
  <PortfolioLayout>
    <PortfolioProvider>
      <PortfolioAbout />
      <PortfolioTechnologies />
      <PortfolioProjects />
      <PortfolioContact />
      <PortfolioFooter />
    </PortfolioProvider>
  </PortfolioLayout>
)
