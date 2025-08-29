import { Outlet, useLocation } from '@tanstack/react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { BRVMTicker } from './Header/BRVMTicker'
import { WhatsAppButton } from './WhatsAppButton'
import { LenisWrapper } from './LenisWrapper'
import { Component } from 'react'
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
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ Layout Error Boundary caught an error:', error, errorInfo)
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
        </div>
      </LenisWrapper>
    </ErrorBoundary>
  )
}
