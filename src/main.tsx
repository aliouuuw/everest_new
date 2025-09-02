import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { registerServiceWorker } from './utils/serviceWorker'

import App from './App.tsx'
import { Layout } from './components/Layout.tsx'
// Import route components - they'll be code-split by Vite automatically
import { AboutPage } from './routes/AboutPage'
import { PublicationsPage } from './routes/PublicationsPage'
import { PublicationPage } from './routes/PublicationPage'
import { FAQPage } from './routes/FAQPage'
import { CEOMessagePage } from './routes/CEOMessagePage'
import { CapitalMarketsPage } from './routes/CapitalMarketsPage'
import { InvestmentBankingPage } from './routes/InvestmentBankingPage'
import { ResearchAnalyticsPage } from './routes/ResearchAnalyticsPage'
import { ServicesPage } from './routes/ServicesPage'
import { BoursePage } from './routes/BoursePage'
import { PortalPage } from './routes/PortalPage'
import { DashboardPage } from './routes/DashboardPage'
import { SimulateurPage } from './routes/SimulateurPage'
import AdminLayout from './routes/admin/AdminLayout.tsx'
import { AdminDashboard } from './routes/admin/AdminDashboard'
import { PublicationsList } from './routes/admin/PublicationsList'
import { PublicationForm } from './routes/admin/PublicationForm'
import { MediaManagement } from './routes/admin/MediaManagement'
import { UserManagement } from './routes/admin/UserManagement'
import UserFormPage from './routes/admin/UserFormPage'
import { Settings } from './routes/admin/Settings'
import { AuthPage } from './routes/AuthPage'

// Initialize ConvexDB client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "")


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

const publicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/publications',
  component: PublicationsPage,
})

const publicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/publications/$slug',
  component: PublicationPage,
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

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
})

const gestionLibreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-libre',
  component: ServicesPage,
})

const gestionMandatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-sous-mandat',
  component: ServicesPage,
})

const gestionAssisteeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gestion-assistee',
  component: ServicesPage,
})

const bourseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bourse',
  component: BoursePage,
})

const simulateurRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulateur',
  component: SimulateurPage,
})

const portalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portal',
  component: PortalPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
})

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: AdminDashboard,
})

const adminPublicationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/publications',
  component: PublicationsList,
})

const adminNewPublicationRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/publications/new',
  component: PublicationForm,
})

const adminEditPublicationRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/publications/$id/edit',
  component: PublicationForm,
})

const adminMediaRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/media',
  component: MediaManagement,
})

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/users',
  component: UserManagement,
})

const adminNewUserRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/users/new',
  component: UserFormPage,
})

const adminEditUserRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/users/$userId',
  component: UserFormPage,
})

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/settings',
  component: Settings,
})

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
})

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  ),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  publicationsRoute,
  publicationRoute,
  faqRoute,
  ceoRoute,
  capitalMarketsRoute,
  ibRoute,
  researchRoute,
  servicesRoute,
  gestionLibreRoute,
  gestionMandatRoute,
  gestionAssisteeRoute,
  bourseRoute,
  simulateurRoute,
  portalRoute,
  dashboardRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminPublicationsRoute,
    adminNewPublicationRoute,
    adminEditPublicationRoute,
    adminMediaRoute,
    adminUsersRoute,
    adminNewUserRoute,
    adminEditUserRoute,
    adminSettingsRoute,
  ]),
  authRoute,
  notFoundRoute,
])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 30_000, // 30 seconds
  defaultPreloadGcTime: 5 * 60_000, // 5 minutes
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement) {
  try {
    // Show loading state
    rootElement.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        background: #f8f9fa;
      ">
        <div style="text-align: center;">
          <div style="
            width: 40px;
            height: 40px;
            border: 4px solid #e5e7eb;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          "></div>
          <p style="color: #6b7280; margin: 0;">Loading Everest Finance...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `
    
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <ConvexAuthProvider client={convex}>
          <RouterProvider router={router} />
        </ConvexAuthProvider>
      </StrictMode>,
    )

    // Register service worker for caching
    registerServiceWorker().catch(error => {
      console.warn('⚠️ Service worker registration failed, but app will continue:', error)
    })
    
    console.log('✅ App initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize app:', error)
    // Show error state with retry button
    rootElement.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        background: #f8f9fa;
      ">
        <div style="text-align: center;">
          <h2 style="color: #dc2626; margin-bottom: 16px;">Failed to load app</h2>
          <p style="color: #6b7280; margin-bottom: 16px;">Please try refreshing the page</p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button onclick="window.location.reload()" style="
              padding: 8px 16px;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">Refresh</button>
            <button onclick="window.location.href='/'" style="
              padding: 8px 16px;
              background: #6b7280;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">Go to Home</button>
          </div>
        </div>
      </div>
    `
  }
} else {
  console.error('❌ Root element not found')
  // If root element is not found, try to create it
  document.body.innerHTML = `
    <div id="app">
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        background: #f8f9fa;
      ">
        <div style="text-align: center;">
          <h2 style="color: #dc2626; margin-bottom: 16px;">Application Error</h2>
          <p style="color: #6b7280; margin-bottom: 16px;">The application container is missing. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="
            padding: 8px 16px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">Refresh Page</button>
        </div>
      </div>
    </div>
  `
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
