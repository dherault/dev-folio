import 'dev-folio-react/dist/style.css'
import './index.css'

import { createRoot } from 'react-dom/client'
import {
  PortfolioContact,
  PortfolioFooter,
  PortfolioHero,
  PortfolioLayout,
  PortfolioProjects,
  PortfolioProvider,
  PortfolioSkills,
} from 'dev-folio-react'

createRoot(document.getElementById('root')!).render(
  <PortfolioLayout>
    <PortfolioProvider>
      <PortfolioHero />
      <PortfolioSkills />
      <PortfolioProjects />
      <PortfolioContact />
      <PortfolioFooter />
    </PortfolioProvider>
  </PortfolioLayout>
)
