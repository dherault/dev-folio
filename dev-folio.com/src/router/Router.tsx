// ! Do not edit this file directly, use npm run router instead
import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import AppLayout from '~app/layout'
import App from '~app/page'

import NotFound from '~components/common/NotFound'
import CenteredSpinner from '~components/common/CenteredSpinner'

const AuthenticationSubRouter = lazy(() => import('~router/subRouters/AuthenticationSubRouter'))
const AdministratorSubRouter = lazy(() => import('~router/subRouters/AdministratorSubRouter'))
const TildeSubRouter = lazy(() => import('~router/subRouters/TildeSubRouter'))
const AccountSubRouter = lazy(() => import('~router/subRouters/AccountSubRouter'))
const SupportSubRouter = lazy(() => import('~router/subRouters/SupportSubRouter'))
const LegalSubRouter = lazy(() => import('~router/subRouters/LegalSubRouter'))
const OnboardingSubRouter = lazy(() => import('~router/subRouters/OnboardingSubRouter'))

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CenteredSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<AppLayout><Outlet /></AppLayout>}
          >
            <Route
              index
              element={<App />}
            />
            <Route
              path="authentication/*"
              element={<Suspense fallback={<CenteredSpinner />}><AuthenticationSubRouter /></Suspense>}
            />
            <Route
              path="administrator/*"
              element={<Suspense fallback={<CenteredSpinner />}><AdministratorSubRouter /></Suspense>}
            />
            <Route
              path="~/*"
              element={<Suspense fallback={<CenteredSpinner />}><TildeSubRouter /></Suspense>}
            />
            <Route
              path="account/*"
              element={<Suspense fallback={<CenteredSpinner />}><AccountSubRouter /></Suspense>}
            />
            <Route
              path="support/*"
              element={<Suspense fallback={<CenteredSpinner />}><SupportSubRouter /></Suspense>}
            />
            <Route
              path="legal/*"
              element={<Suspense fallback={<CenteredSpinner />}><LegalSubRouter /></Suspense>}
            />
            <Route
              path="onboarding/*"
              element={<Suspense fallback={<CenteredSpinner />}><OnboardingSubRouter /></Suspense>}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
