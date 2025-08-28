import React from 'react'
import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { BRVMTicker } from './Header/BRVMTicker'
import { WhatsAppButton } from './WhatsAppButton'

export const Layout = () => {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
      {/* Header - Overlays content */}
      <Header />

      {/* Main content area - All routes render here */}
      <main className="relative z-0">
        <Outlet />
      </main>

      {/* BRVM Live Ticker */}
      <BRVMTicker />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
