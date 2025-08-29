import { Outlet, useLocation } from '@tanstack/react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { BRVMTicker } from './Header/BRVMTicker'
import { WhatsAppButton } from './WhatsAppButton'
import { LenisWrapper } from './LenisWrapper'

export const Layout = () => {
  const location = useLocation()

  // Check if user is authenticated and on dashboard
  const isAuthenticated = typeof window !== 'undefined' && sessionStorage.getItem('isAuthenticated') === 'true'
  const isOnDashboard = location.pathname === '/dashboard'
  const hideExtras = isAuthenticated && isOnDashboard
  return (
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
  )
}
