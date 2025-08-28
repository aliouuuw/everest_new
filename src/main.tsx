import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

import App from './App.tsx'
import { Layout } from './components/Layout.tsx'
import {
  AboutPage,
  AssistedMgmtPage,
  BoursePage,
  CEOMessagePage,
  CapitalMarketsPage,
  DiscretionaryMgmtPage,
  FAQPage,
  InvestmentBankingPage,
  MandateMgmtPage,
  NewsroomPage,
  PortalPage,
  ResearchAnalyticsPage,
} from './routes'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const newsroomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/newsroom',
  component: NewsroomPage,
})

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FAQPage,
})

const ceoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mot-dg',
  component: CEOMessagePage,
})

const capitalMarketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marche-capitaux',
  component: CapitalMarketsPage,
})

const ibRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ingenieurie-financiere',
  component: InvestmentBankingPage,
})

const researchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recherche-analyses',
  component: ResearchAnalyticsPage,
})

const gestionLibreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-libre',
  component: DiscretionaryMgmtPage,
})

const gestionMandatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-sous-mandat',
  component: MandateMgmtPage,
})

const gestionAssisteeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-assistee',
  component: AssistedMgmtPage,
})

const bourseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bourse',
  component: BoursePage,
})

const portalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portal',
  component: PortalPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  newsroomRoute,
  faqRoute,
  ceoRoute,
  capitalMarketsRoute,
  ibRoute,
  researchRoute,
  gestionLibreRoute,
  gestionMandatRoute,
  gestionAssisteeRoute,
  bourseRoute,
  portalRoute,
])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
