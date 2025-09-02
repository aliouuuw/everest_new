import { Component } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { BRVMTicker } from './Header/BRVMTicker'
import { WhatsAppButton } from './WhatsAppButton'
import { LenisWrapper } from './LenisWrapper'
import { SWUpdateNotification } from './SWUpdateNotification'
import type { ErrorInfo, ReactNode } from 'react'

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Don't catch authentication, navigation, or React lifecycle errors
    const shouldIgnore = 
      error.message.includes('signout') || 
      error.message.includes('signIn') ||
      error.message.includes('auth') ||
      error.message.includes('getCurrentUser') ||
      error.message.includes('Could not find public function') ||
      error.message.includes('Server Error') ||
      error.message.includes('Rendered fewer hooks than expected') ||
      error.message.includes('Rendered more hooks than during the previous render') ||
      error.message.includes('early return statement') ||
      error.message.includes('navigate') ||
      error.message.includes('Navigation') ||
      error.message.includes('router') ||
      error.message.includes('Router') ||
      error.message.includes('Cannot update a component') ||
      error.message.includes('Warning: Can\'t perform a React state update') ||
      error.message.includes('AbortError') ||
      error.message.includes('The operation was aborted') ||
      error.stack?.includes('useNavigate') ||
      error.stack?.includes('navigate') ||
      error.stack?.includes('useAuth') ||
      error.stack?.includes('ProtectedRoute')
    
    if (shouldIgnore) {
      console.warn('Non-critical error caught by boundary (ignoring):', error.message)
      return { hasError: false }
    }
    
    // Only catch genuine UI errors, not auth/navigation errors
    const isUIError = 
      error.message.includes('Cannot read property') ||
      error.message.includes('Cannot access before initialization') ||
      error.message.includes('is not a function') ||
      error.message.includes('Cannot destructure property') ||
      error.message.includes('ReferenceError') ||
      error.message.includes('TypeError')
    
    if (isUIError) {
      console.error('UI Error caught by boundary:', error.message)
      return { hasError: true, error }
    }
    
    // For all other errors, log but don't show error boundary
    console.warn('Unknown error caught by boundary (ignoring):', error.message)
    return { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log genuine errors that we're actually handling
    const shouldIgnore = 
      error.message.includes('signout') || 
      error.message.includes('signIn') ||
      error.message.includes('auth') ||
      error.message.includes('navigate') ||
      error.message.includes('Cannot update a component') ||
      error.message.includes('AbortError')
    
    if (!shouldIgnore) {
      console.error('❌ Layout Error Boundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export const Layout = () => {
  const location = useLocation()

  // Check if user is authenticated and on dashboard
  const isAuthenticated = typeof window !== 'undefined' && sessionStorage.getItem('isAuthenticated') === 'true'
  const isOnDashboard = location.pathname === '/dashboard'
  const hideExtras = isAuthenticated && isOnDashboard
  
  return (
    <ErrorBoundary>
      <LenisWrapper>
        <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
          {/* Header - Fixed position overlay */}
          <Header />

          {/* Main content area - No padding needed since Header is fixed */}
          <main className="relative">
            <Outlet />
          </main>

          {/* BRVM Live Ticker - Hide on dashboard */}
          {!hideExtras && <BRVMTicker />}

          {/* Footer - Hide on dashboard */}
          {!hideExtras && <Footer />}

          {/* Floating WhatsApp Button - Hide on dashboard */}
          {!hideExtras && <WhatsAppButton />}

          {/* Service Worker Update Notification */}
          <SWUpdateNotification />
        </div>
      </LenisWrapper>
    </ErrorBoundary>
  )
}
