import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { BRVMTicker } from '@/components/Header/BRVMTicker'
import { Header } from '@/components/Header/Header'
import { LenisWrapper } from '@/components/LenisWrapper'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LocationContext } from '../shims/tanstack-react-router'

type Props = {
  pathname: string
  children?: ReactNode
}

/** Redesign chrome (ticker, header, footer, WhatsApp) around a page. Mirrors src/components/Layout.tsx. */
export default function SiteShell({ pathname, children }: Props) {
  return (
    <LocationContext.Provider value={pathname}>
      <LenisWrapper>
        <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
          <BRVMTicker />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </LenisWrapper>
    </LocationContext.Provider>
  )
}
